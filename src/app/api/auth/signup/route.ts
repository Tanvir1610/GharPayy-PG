import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, role = 'tenant' } = await req.json();

    if (!fullName || !email || !password) return err('fullName, email and password are required');
    if (password.length < 6) return err('Password must be at least 6 characters');
    if (!['tenant', 'owner'].includes(role)) return err('role must be tenant or owner');

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });

    if (error) return err(error.message, 400);
    if (!data.user) return err('Signup failed', 400);

    return ok({
      user: {
        id: data.user.id,
        fullName,
        email: data.user.email,
        role,
      },
    }, 201);
  } catch (e: unknown) {
    console.error(e);
    return err('Server error', 500);
  }
}
