import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role, phone, avatar_url')
      .eq('id', user.id)
      .single();

    return ok({
      id: user.id,
      fullName: profile?.full_name ?? '',
      email: user.email,
      role: profile?.role ?? 'tenant',
      phone: profile?.phone ?? '',
      avatar: profile?.avatar_url ?? '',
    });
  } catch {
    return unauthorized();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { fullName, phone, avatar } = await req.json();
    const updates: Record<string, string> = {};
    if (fullName) updates.full_name = fullName;
    if (phone !== undefined) updates.phone = phone;
    if (avatar) updates.avatar_url = avatar;

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select('full_name, role, phone, avatar_url')
      .single();

    if (error) return err(error.message, 400);

    return ok({ id: user.id, fullName: data.full_name, email: user.email, role: data.role, phone: data.phone, avatar: data.avatar_url });
  } catch {
    return err('Server error', 500);
  }
}
