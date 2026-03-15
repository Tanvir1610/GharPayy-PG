import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      getAll() { return req.cookies.getAll(); },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options as Parameters<typeof res.cookies.set>[2])
        );
      },
    },
  });

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;
  const role = user?.user_metadata?.role ?? null;

  if ((pathname === '/login' || pathname === '/signup') && user) {
    const dest = role === 'admin' ? '/admin' : role === 'owner' ? '/owner' : '/dashboard';
    return NextResponse.redirect(new URL(dest, req.url));
  }
  if (pathname.startsWith('/dashboard') && !user)
    return NextResponse.redirect(new URL('/login', req.url));
  if (pathname.startsWith('/owner')) {
    if (!user) return NextResponse.redirect(new URL('/login', req.url));
    if (role === 'tenant') return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  if (pathname.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/login', req.url));
    if (role !== 'admin') return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/owner/:path*', '/admin/:path*', '/login', '/signup'],
};
