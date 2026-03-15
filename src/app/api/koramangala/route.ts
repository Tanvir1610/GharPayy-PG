import { createClient } from '@/lib/supabase/server';
import { ok, err } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('properties')
      .select('id,name,slug,address,city,area,gender_preference,photos,amenities,average_rating,total_reviews,is_verified,highlights,price_range,tier,min_rent,max_rent')
      .eq('city', 'Bangalore')
      .eq('area', 'Koramangala')
      .order('average_rating', { ascending: false });

    if (error) return err(error.message, 400);

    const mapped = (data ?? []).map(p => ({
      id: p.id, name: p.name ?? '', slug: p.slug ?? '',
      address: p.address ?? '', genderPreference: p.gender_preference ?? 'any',
      photos: p.photos ?? [], amenities: p.amenities ?? [],
      averageRating: p.average_rating ?? 4.5, totalReviews: p.total_reviews ?? 0,
      isVerified: p.is_verified ?? false, highlights: p.highlights ?? [],
      priceRange: p.price_range ?? '₹12K–17K', tier: p.tier ?? 'Basic Plus',
      minRent: p.min_rent ?? 12000, maxRent: p.max_rent ?? 17000,
    }));

    return ok(mapped);
  } catch (e: unknown) {
    console.error(e);
    return err('Server error', 500);
  }
}
