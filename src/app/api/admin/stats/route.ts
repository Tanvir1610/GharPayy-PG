import { createAdminClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') return forbidden();

    const admin = createAdminClient();
    const [
      { count: totalUsers },
      { count: totalProperties },
      { count: verifiedProperties },
      { count: totalBookings },
      { count: pendingBookings },
      { count: totalReviews },
    ] = await Promise.all([
      admin.from('profiles').select('*', { count: 'exact', head: true }),
      admin.from('properties').select('*', { count: 'exact', head: true }),
      admin.from('properties').select('*', { count: 'exact', head: true }).eq('is_verified', true),
      admin.from('bookings').select('*', { count: 'exact', head: true }),
      admin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      admin.from('wishlists').select('*', { count: 'exact', head: true }),
    ]);

    return ok({ totalUsers, totalProperties, verifiedProperties, totalBookings, pendingBookings, totalReviews });
  } catch { return err('Server error', 500); }
}
