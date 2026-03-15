import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!['owner','admin'].includes(profile?.role ?? '')) return forbidden();

    const { data: props } = await supabase.from('properties').select('id').eq('owner_id', user.id);
    const ids = props?.map(p => p.id) ?? [];
    if (ids.length === 0) return ok([]);

    const { data, error } = await supabase
      .from('bookings')
      .select('*, property:properties(id,name,city), room:rooms(id,room_type,rent), user:profiles!user_id(id,full_name,email,phone)')
      .in('property_id', ids)
      .order('created_at', { ascending: false });

    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}
