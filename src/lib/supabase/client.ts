import { createBrowserClient } from '@supabase/ssr';

let _client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (typeof window === 'undefined') return null as unknown as ReturnType<typeof createBrowserClient>;

  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null as unknown as ReturnType<typeof createBrowserClient>;

  if (!_client) {
    _client = createBrowserClient(url, key);
  }
  return _client;
}
