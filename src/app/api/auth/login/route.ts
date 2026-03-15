import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return err('Email and password are required');

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return err('Invalid credentials', 401);
    if (!data.user) return err('Login failed', 401);

    // Fetch profile for role
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', data.user.id)
      .single();

    return ok({
      user: {
        id: data.user.id,
        fullName: profile?.full_name ?? '',
        email: data.user.email,
        role: profile?.role ?? 'tenant',
      },
    });
  } catch (e: unknown) {
    console.error(e);
    return err('Server error', 500);
  }
}
