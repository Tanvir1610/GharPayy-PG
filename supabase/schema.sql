-- ============================================================
-- GharPayy Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles (extends auth.users) ─────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  email       text not null unique,
  role        text not null default 'tenant' check (role in ('tenant','owner','admin')),
  phone       text,
  avatar_url  text,
  is_active   boolean not null default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Properties ────────────────────────────────────────────────
create table if not exists public.properties (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  slug              text,
  address           text not null,
  city              text not null,
  area              text,
  description       text,
  gender_preference text not null default 'any' check (gender_preference in ('male','female','any')),
  amenities         text[]   default '{}',
  rules             text,
  photos            text[]   default '{}',
  highlights        text[]   default '{}',
  nearby_places     text[]   default '{}',
  tier              text,
  price_range       text,
  min_rent          integer,
  max_rent          integer,
  owner_id          uuid not null references public.profiles(id) on delete cascade,
  is_verified       boolean not null default false,
  average_rating    numeric(3,2) default 0,
  total_reviews     integer default 0,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

create index if not exists idx_properties_city on public.properties(city);
create index if not exists idx_properties_area on public.properties(city, area);
create index if not exists idx_properties_owner on public.properties(owner_id);
create index if not exists idx_properties_verified on public.properties(is_verified);

-- ── Rooms ─────────────────────────────────────────────────────
create table if not exists public.rooms (
  id            uuid primary key default uuid_generate_v4(),
  property_id   uuid not null references public.properties(id) on delete cascade,
  room_type     text not null check (room_type in ('single','double','triple','dormitory')),
  total_beds    integer not null check (total_beds > 0),
  occupied_beds integer not null default 0,
  rent          integer not null,
  amenities     text[]  default '{}',
  photos        text[]  default '{}',
  created_at    timestamptz default now()
);

-- ── Bookings ──────────────────────────────────────────────────
create table if not exists public.bookings (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  property_id  uuid not null references public.properties(id) on delete cascade,
  room_id      uuid not null references public.rooms(id) on delete cascade,
  move_in_date date not null,
  rent         integer not null,
  status       text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed')),
  notes        text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── Visits ────────────────────────────────────────────────────
create table if not exists public.visits (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  property_id  uuid not null references public.properties(id) on delete cascade,
  visit_date   date not null,
  visit_time   text not null,
  status       text not null default 'scheduled' check (status in ('scheduled','completed','cancelled')),
  notes        text,
  created_at   timestamptz default now()
);

-- ── Wishlists ─────────────────────────────────────────────────
create table if not exists public.wishlists (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  property_id  uuid not null references public.properties(id) on delete cascade,
  created_at   timestamptz default now(),
  unique(user_id, property_id)
);

-- ── Messages ──────────────────────────────────────────────────
create table if not exists public.messages (
  id           uuid primary key default uuid_generate_v4(),
  sender_id    uuid not null references public.profiles(id) on delete cascade,
  receiver_id  uuid not null references public.profiles(id) on delete cascade,
  property_id  uuid references public.properties(id) on delete set null,
  content      text not null,
  is_read      boolean not null default false,
  created_at   timestamptz default now()
);

-- ── Auto-create profile on signup ─────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'tenant')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Row Level Security ────────────────────────────────────────
alter table public.profiles    enable row level security;
alter table public.properties  enable row level security;
alter table public.rooms       enable row level security;
alter table public.bookings    enable row level security;
alter table public.visits      enable row level security;
alter table public.wishlists   enable row level security;
alter table public.messages    enable row level security;

-- Profiles
create policy "Public profiles are viewable" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Properties — public read, owners write
create policy "Properties are public" on public.properties for select using (true);
create policy "Owners can insert" on public.properties for insert with check (auth.uid() = owner_id);
create policy "Owners can update own" on public.properties for update using (auth.uid() = owner_id);
create policy "Owners can delete own" on public.properties for delete using (auth.uid() = owner_id);

-- Rooms — public read
create policy "Rooms are public" on public.rooms for select using (true);
create policy "Owners manage rooms" on public.rooms for all using (
  auth.uid() = (select owner_id from public.properties where id = property_id)
);

-- Bookings
create policy "Users see own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Users create bookings" on public.bookings for insert with check (auth.uid() = user_id);
create policy "Users update own bookings" on public.bookings for update using (auth.uid() = user_id);

-- Visits
create policy "Users see own visits" on public.visits for select using (auth.uid() = user_id);
create policy "Users create visits" on public.visits for insert with check (auth.uid() = user_id);

-- Wishlists
create policy "Users see own wishlist" on public.wishlists for select using (auth.uid() = user_id);
create policy "Users manage wishlist" on public.wishlists for all using (auth.uid() = user_id);

-- Messages
create policy "Users see own messages" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Users send messages" on public.messages for insert with check (auth.uid() = sender_id);

-- ── Seed Koramangala data function ────────────────────────────
-- After running this schema, use the seed script:
-- npx tsx src/scripts/seedKoramangala.ts
