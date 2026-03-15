import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

    let query = supabase
      .from('bookings')
      .select('*, property:properties(id,name,city,photos), room:rooms(id,room_type,rent), user:profiles!user_id(id,full_name,email)')
      .order('created_at', { ascending: false });

    if (profile?.role === 'tenant') query = query.eq('user_id', user.id);

    const { data, error } = await query;
    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { propertyId, roomId, moveInDate, rent, notes } = await req.json();
    if (!propertyId || !roomId || !moveInDate || !rent)
      return err('propertyId, roomId, moveInDate, rent are required');

    const { data, error } = await supabase.from('bookings').insert({
      user_id: user.id, property_id: propertyId, room_id: roomId,
      move_in_date: moveInDate, rent, notes,
    }).select().single();

    if (error) return err(error.message, 400);
    return ok(data, 201);
  } catch { return err('Server error', 500); }
}
