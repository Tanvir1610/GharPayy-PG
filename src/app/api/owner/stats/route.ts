import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!['owner','admin'].includes(profile?.role ?? '')) return forbidden();

    const { data: properties } = await supabase.from('properties').select('id').eq('owner_id', user.id);
    const ids = properties?.map(p => p.id) ?? [];
    if (ids.length === 0) return ok({ properties: 0, bookings: 0, occupancy: 0, revenue: 0 });

    const [{ data: bookings }, { data: rooms }] = await Promise.all([
      supabase.from('bookings').select('rent,status').in('property_id', ids),
      supabase.from('rooms').select('total_beds,occupied_beds').in('property_id', ids),
    ]);

    const confirmed = (bookings ?? []).filter(b => b.status === 'confirmed');
    const totalBeds = (rooms ?? []).reduce((s, r) => s + r.total_beds, 0);
    const occupiedBeds = (rooms ?? []).reduce((s, r) => s + r.occupied_beds, 0);
    const revenue = confirmed.reduce((s, b) => s + b.rent, 0);

    return ok({ properties: ids.length, bookings: bookings?.length ?? 0, occupancy: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0, revenue });
  } catch { return err('Server error', 500); }
}
