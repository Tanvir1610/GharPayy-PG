import { NextRequest } from 'next/server';
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
      .from('rooms')
      .select('*, property:properties(id,name,city)')
      .in('property_id', ids)
      .order('created_at', { ascending: false });

    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!['owner','admin'].includes(profile?.role ?? '')) return forbidden();

    const { propertyId, roomType, totalBeds, rent, amenities } = await req.json();
    if (!propertyId || !roomType || !totalBeds || !rent) return err('propertyId, roomType, totalBeds, rent required');

    const { data: prop } = await supabase.from('properties').select('owner_id').eq('id', propertyId).single();
    if (!prop) return err('Property not found', 404);
    if (profile?.role !== 'admin' && prop.owner_id !== user.id) return forbidden();

    const { data, error } = await supabase.from('rooms').insert({
      property_id: propertyId, room_type: roomType, total_beds: totalBeds, rent, amenities: amenities ?? [],
    }).select().single();

    if (error) return err(error.message, 400);
    return ok(data, 201);
  } catch { return err('Server error', 500); }
}
