import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return err('Email is required');

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/reset-password`,
    });

    if (error) return err(error.message, 400);

    // Always return success to avoid email enumeration
    return ok({ message: 'If an account exists, a reset link has been sent.' });
  } catch {
    return err('Server error', 500);
  }
}
