import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden, notFound } from '@/lib/api';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: booking } = await supabase.from('bookings').select('user_id, property_id').eq('id', id).single();
    if (!booking) return notFound('Booking');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const { status } = await req.json();

    if (profile?.role === 'tenant') {
      if (booking.user_id !== user.id) return forbidden();
      if (status !== 'cancelled') return forbidden();
    }
    if (profile?.role === 'owner') {
      const { data: prop } = await supabase.from('properties').select('owner_id').eq('id', booking.property_id).single();
      if (prop?.owner_id !== user.id) return forbidden();
    }

    const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select().single();
    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}
