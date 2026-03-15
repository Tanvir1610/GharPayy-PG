import { createClient } from '@/lib/supabase/server';
import { ok, err } from '@/lib/api';
import { KORAMANGALA_PROPERTIES } from '@/lib/koramangalaData';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('properties')
      .select('id,name,slug,address,city,area,gender_preference,photos,amenities,average_rating,total_reviews,is_verified,highlights,price_range,tier,min_rent,max_rent,nearby_places')
      .eq('city', 'Bangalore')
      .eq('area', 'Koramangala')
      .order('average_rating', { ascending: false });

    // If Supabase has data — return it. Otherwise fall back to static scraped data.
    if (!error && data && data.length > 0) {
      return ok(data);
    }

    return ok(KORAMANGALA_PROPERTIES);
  } catch {
    return ok(KORAMANGALA_PROPERTIES);
  }
}
