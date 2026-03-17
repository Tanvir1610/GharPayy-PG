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
    const { data, error, count } = await admin
      .from('properties')
      .select('*, owner:profiles!owner_id(full_name,email)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) return err(error.message);
    return ok({ properties: data ?? [], total: count ?? 0 });
  } catch (e) {
    console.error(e);
    return err('Server error', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') return forbidden();

    const { id, ...updates } = await req.json();
    if (!id) return err('Property id required');

    const admin = createAdminClient();
    const { data, error } = await admin.from('properties').update(updates).eq('id', id).select().single();
    if (error) return err(error.message);
    return ok(data);
  } catch (e) {
    console.error(e);
    return err('Server error', 500);
  }
}
