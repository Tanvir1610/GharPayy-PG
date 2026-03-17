import { createAdminClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden } from '@/lib/api';
import { PROPERTY_STATS } from '@/lib/allPropertiesData';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') return forbidden();

    const admin = createAdminClient();

    const [
      { count: totalProperties },
      { count: totalUsers },
      { count: totalBookings },
      { count: pendingVisits },
    ] = await Promise.all([
      admin.from('properties').select('*', { count: 'exact', head: true }),
      admin.from('profiles').select('*', { count: 'exact', head: true }),
      admin.from('bookings').select('*', { count: 'exact', head: true }),
      admin.from('visits').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);

    return ok({
      totalProperties: totalProperties ?? PROPERTY_STATS.total,
      totalUsers: totalUsers ?? 0,
      totalBookings: totalBookings ?? 0,
      pendingVisits: pendingVisits ?? 0,
      staticProperties: PROPERTY_STATS.total,
      girls: PROPERTY_STATS.girls,
      boys: PROPERTY_STATS.boys,
      coed: PROPERTY_STATS.coed,
    });
  } catch (e) {
    console.error(e);
    // Return static stats on DB failure
    return ok({
      totalProperties: PROPERTY_STATS.total,
      totalUsers: 0,
      totalBookings: 0,
      pendingVisits: 0,
      staticProperties: PROPERTY_STATS.total,
      girls: PROPERTY_STATS.girls,
      boys: PROPERTY_STATS.boys,
      coed: PROPERTY_STATS.coed,
    });
  }
}
