import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieMethodsServer } from '@supabase/ssr';

type CookieToSet = Parameters<CookieMethodsServer['setAll']>[0][number];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;
  const role = user?.user_metadata?.role ?? null;

  // Redirect logged-in users away from auth pages
  if ((pathname === '/login' || pathname === '/signup') && user) {
    const dest = role === 'admin' ? '/admin' : role === 'owner' ? '/owner' : '/dashboard';
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // Protect tenant dashboard
  if (pathname.startsWith('/dashboard') && !user)
    return NextResponse.redirect(new URL('/login', req.url));

  // Protect owner dashboard
  if (pathname.startsWith('/owner')) {
    if (!user) return NextResponse.redirect(new URL('/login', req.url));
    if (role === 'tenant') return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protect admin dashboard
  if (pathname.startsWith('/admin')) {
    if (!user) return NextResponse.redirect(new URL('/login', req.url));
    if (role !== 'admin') return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/owner/:path*', '/admin/:path*', '/login', '/signup'],
};
