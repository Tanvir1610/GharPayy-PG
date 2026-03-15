import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') return forbidden();

    const admin = createAdminClient();
    const { data, error } = await admin.from('profiles').select('*').order('created_at', { ascending: false });
    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') return forbidden();

    const { userId, isActive, role } = await req.json();
    if (!userId) return err('userId required');

    const updates: Record<string, unknown> = {};
    if (typeof isActive === 'boolean') updates.is_active = isActive;
    if (role && ['tenant','owner','admin'].includes(role)) updates.role = role;

    const admin = createAdminClient();
    const { data, error } = await admin.from('profiles').update(updates).eq('id', userId).select().single();
    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}
