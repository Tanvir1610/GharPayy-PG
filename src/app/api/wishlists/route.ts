import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data, error } = await supabase
      .from('wishlists')
      .select('*, property:properties(id,name,city,photos,amenities,average_rating,gender_preference,is_verified)')
      .eq('user_id', user.id)
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
    const { propertyId } = await req.json();
    if (!propertyId) return err('propertyId is required');

    const { data: existing } = await supabase.from('wishlists').select('id').eq('user_id', user.id).eq('property_id', propertyId).single();
    if (existing) {
      await supabase.from('wishlists').delete().eq('id', existing.id);
      return ok({ saved: false });
    }
    await supabase.from('wishlists').insert({ user_id: user.id, property_id: propertyId });
    return ok({ saved: true }, 201);
  } catch { return err('Server error', 500); }
}
