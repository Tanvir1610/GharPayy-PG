import { createBrowserClient } from '@supabase/ssr';

// Singleton — only created once in the browser, never at build time
let _client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // During Next.js build/SSR, window is undefined.
  // AuthProvider is 'use client' — its effects never actually run server-side,
  // but the module is still parsed. We return null here and guard in useAuth.
  if (typeof window === 'undefined') return null as unknown as ReturnType<typeof createBrowserClient>;

  if (!_client) {
    _client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}
