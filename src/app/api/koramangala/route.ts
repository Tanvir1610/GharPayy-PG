import { createClient } from '@/lib/supabase/server';
import { ok, err } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('properties')
      .select('id,name,slug,address,city,area,gender_preference,photos,amenities,average_rating,total_reviews,is_verified,highlights,price_range,tier,min_rent,max_rent,nearby_places')
      .eq('city', 'Bangalore')
      .eq('area', 'Koramangala')
      .order('average_rating', { ascending: false });

    if (error) return err(error.message, 400);
    return ok(data ?? []);
  } catch (e: unknown) {
    console.error(e);
    return err('Server error', 500);
  }
}
