# GharPayy — PG Lead Matching Dashboard

A full-stack Next.js 14 App Router dashboard for managing PG (Paying Guest) leads and matching them to properties using a scoring engine.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up Supabase

In your Supabase SQL editor, run the contents of `supabase/schema.sql`. This creates:
- A `profiles` table linked to `auth.users`
- Row-level security policies
- A trigger that auto-creates a profile on signup

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📐 Architecture

```
src/
├── app/
│   ├── layout.tsx           # Root layout — AuthProvider + ToastContainer
│   ├── page.tsx             # Redirects → /dashboard
│   ├── dashboard/           # Post-login home with stats & quick actions
│   ├── leads/               # Lead list with filtering + match drawer
│   ├── properties/          # Property grid with filtering
│   ├── matching/            # Split-panel: leads list ↔ property matches
│   ├── login/               # Supabase auth — sign in
│   ├── signup/              # Supabase auth — sign up (tenant or owner)
│   └── api/
│       ├── leads/           # GET all leads
│       │   └── [id]/        # GET single lead
│       ├── properties/      # GET all properties
│       └── match/           # POST { leadId } → scored MatchResult[]
├── components/
│   ├── AppShell.tsx         # Layout wrapper — auth guard + sidebar
│   ├── Sidebar.tsx          # Nav + user avatar + sign out
│   ├── LeadCard.tsx         # Lead display card with Find Match button
│   ├── PropertyCard.tsx     # Property display with score breakdown
│   ├── MatchDrawer.tsx      # Sliding panel with scored matches
│   └── ui/
│       ├── ToastContainer   # Global toast notifications
│       ├── Button           # Styled button
│       └── Input            # Styled input
├── hooks/
│   └── useAuth.tsx          # AuthContext — signIn/signUp/signOut/user
├── lib/
│   ├── mockData.ts          # 8 leads + 8 properties (mock JSON)
│   ├── matchEngine.ts       # Scoring algorithm
│   └── supabase/
│       └── server.ts        # Server-side Supabase client
├── middleware.ts             # Route protection (Supabase SSR)
└── types/
    └── index.ts             # Lead, Property, MatchResult types
```

---

## 🧠 Matching Score System

| Criterion | Max Points | Logic |
|-----------|-----------|-------|
| **Location** | 40 | Exact area match = 40 · partial city = 15 · none = 0 |
| **Budget** | 30 | Within range = 30 · slightly outside = 20 or 10 · far outside = 0 |
| **Room Type** | 20 | Lead's requested type available = 20 · else = 0 |
| **Gender** | 10 | Exact gender match = 10 · unisex property = 7 · mismatch = 0 |
| **Total** | **100** | |

**Labels:** Excellent (≥80) · Good (≥55) · Fair (≥35) · Low (<35)

---

## 🔐 Auth Flow

1. User visits any protected route → middleware checks Supabase session
2. No session → redirect to `/login`
3. On `signIn` success → redirect to `/dashboard`
4. `AuthProvider` listens to `onAuthStateChange` for real-time session sync
5. `profiles` table auto-populated via DB trigger on signup

---

## 🛢️ Supabase Database

Run `supabase/schema.sql` to create:

```sql
profiles (
  id          uuid  -- references auth.users
  full_name   text
  role        text  -- 'tenant' | 'owner' | 'admin'
  phone       text
  avatar_url  text
  created_at  timestamptz
  updated_at  timestamptz
)
```

RLS ensures users can only read/write their own profile.

---

## 🔧 Connecting to a Real Database

The API routes (`/api/leads`, `/api/properties`, `/api/match`) currently use **mock data** from `src/lib/mockData.ts`. To connect to Supabase:

1. Create `leads` and `properties` tables in Supabase
2. Import `createClient` from `@/lib/supabase/server` in your API routes
3. Replace `mockLeads` / `mockProperties` with Supabase queries:

```ts
const supabase = await createClient();
const { data: leads } = await supabase.from('leads').select('*');
```

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Auth | Supabase Auth + `@supabase/ssr` |
| Database | Supabase (PostgreSQL) |
| Styling | CSS-in-JS (inline) + Tailwind utilities |
| Icons | Lucide React |
| Animation | CSS keyframes |
| Language | TypeScript |
