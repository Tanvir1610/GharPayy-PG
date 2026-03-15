# GharPayy — Next.js 15 + Supabase

## ⚡ Deploy to Vercel in 5 Steps

### Step 1 — Create Supabase Project (free)
1. Go to **https://supabase.com** → New Project
2. Open **SQL Editor** → New Query → paste the full contents of `supabase/schema.sql` → **Run**
3. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### Step 2 — Push this project to GitHub
```bash
cd gharpayy-final
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/YOUR_USERNAME/gharpayy.git
git push -u origin main
```

### Step 3 — Import to Vercel
1. Go to **https://vercel.com/new** → Import your GitHub repo
2. Add these **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL       = https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = eyJhb...
   SUPABASE_SERVICE_ROLE_KEY      = eyJhb...
   ```
3. Click **Deploy** — build will succeed with zero errors ✅

### Step 4 — Seed Koramangala Properties
After deploy, run locally (with your prod env vars):

1. Sign up at `your-app.vercel.app/signup` with role **Owner**
2. Go to **Supabase Dashboard → Authentication → Users** → copy your User UUID
3. Run:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJhb... \
SEED_OWNER_ID=your-owner-uuid \
npx tsx src/scripts/seedKoramangala.ts
```
4. Visit `your-app.vercel.app/koramangala` — 20 properties with real photos ✅

---

## Local Development
```bash
npm install
cp .env.example .env.local
# Fill in your Supabase keys in .env.local
npm run dev
# Open http://localhost:3000
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 18 + Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Sessions | @supabase/ssr (auto cookie handling) |
| Hosting | Vercel |

## Why It Works on Vercel
All pages are **static shells** — they contain zero DB calls.  
Data is fetched by **client components** calling `/api/*` routes.  
API routes only run at **request time**, never at build time.

```
page.tsx (static)  →  ClientComponent  →  /api/route  →  Supabase
```

## Project Structure
```
src/
├── app/
│   ├── api/                  # 20 API route handlers (Supabase queries)
│   │   ├── auth/             # login, signup, logout, me
│   │   ├── properties/       # CRUD + detail/[id]
│   │   ├── bookings/         # list, create, PATCH status
│   │   ├── visits/           # list, create
│   │   ├── wishlists/        # toggle save
│   │   ├── messages/         # list, send
│   │   ├── koramangala/      # scraped property listings
│   │   ├── owner/            # stats, properties, rooms, bookings, visits
│   │   └── admin/            # stats, users, properties
│   ├── koramangala/          # /koramangala listing page
│   ├── property/[id]/        # property detail page
│   ├── dashboard/            # tenant: bookings, visits, wishlist, messages, payments, profile
│   ├── owner/                # owner: properties, rooms, bookings, visits, analytics
│   └── admin/                # admin: users, properties, analytics
├── components/
│   ├── koramangala/          # KoramangalaClient (fetches + filters)
│   ├── property/             # PropertyGallery, PropertyInfo, PropertyDetailClient
│   ├── dashboard/            # DashboardLayout, Sidebars
│   ├── layout/               # Header, Footer
│   └── ui/                   # Button, Input, Card, Badge, ToastContainer
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # browser client
│   │   ├── server.ts         # server client + admin client
│   │   └── types.ts          # TypeScript types for all tables
│   ├── api.ts                # ok(), err(), unauthorized() helpers
│   └── utils.ts              # cn() Tailwind class merger
├── hooks/
│   └── useAuth.tsx           # AuthContext using Supabase Auth
├── middleware.ts             # Route protection via Supabase session
└── scripts/
    └── seedKoramangala.ts    # Seeds 20 real properties from gharpayy.com

supabase/
└── schema.sql                # Complete PostgreSQL schema + RLS policies
```

## Supabase Tables

| Table | Description |
|-------|-------------|
| `profiles` | Extends auth.users — fullName, role, phone |
| `properties` | PG listings with photos, amenities, pricing tiers |
| `rooms` | Room types within each property |
| `bookings` | Tenant booking requests |
| `visits` | Scheduled property visits |
| `wishlists` | Saved properties per user |
| `messages` | In-app messaging between tenants & owners |
