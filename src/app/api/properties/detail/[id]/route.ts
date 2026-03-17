import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, notFound } from '@/lib/api';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const [{ data: prop, error }, { data: rooms }] = await Promise.all([
      supabase.from('properties').select('*, owner:profiles!owner_id(full_name,email,phone)').eq('id', id).single(),
      supabase.from('rooms').select('*').eq('property_id', id),
    ]);

    if (error || !prop) {
      const staticProp = ALL_PROPERTIES.find(p => p.id === id || p.slug === id);
      if (!staticProp) return notFound('Property');

      return ok({
        property: {
          id: staticProp.id, name: staticProp.name,
          address: `${staticProp.locality}, ${staticProp.area}, Bangalore`,
          city: staticProp.city, area: staticProp.area,
          description: staticProp.usp,
          genderPreference: staticProp.gender_preference,
          amenities: staticProp.amenities, rules: 'No smoking inside. ID proof mandatory. Minimum stay as specified.',
          photos: staticProp.photos, isVerified: staticProp.is_verified,
          averageRating: staticProp.average_rating, totalReviews: staticProp.total_reviews,
          highlights: staticProp.highlights, tier: staticProp.tier,
          priceRange: staticProp.price_range, minRent: staticProp.min_rent, maxRent: staticProp.max_rent,
          mealsIncluded: staticProp.meals_included, foodType: staticProp.food_type,
          noCurfew: staticProp.no_curfew, minimumStay: staticProp.minimum_stay,
          securityDeposit: staticProp.security_deposit, utilitiesIncluded: staticProp.utilities_included,
          nearbyLandmarks: staticProp.nearby_landmarks,
          owner: { fullName: 'GharPayy Team', email: 'hello@gharpayy.com', phone: '+91 83073 96042' },
        },
        rooms: staticProp.room_types.map((rt, i) => ({
          id: `${staticProp.id}-${i}`, roomType: rt,
          totalBeds: rt.includes('Triple') ? 3 : rt.includes('Double') ? 2 : 1,
          occupiedBeds: 0,
          rent: i === 0 ? staticProp.min_rent : staticProp.max_rent,
          amenities: staticProp.amenities.slice(0, 6),
        })),
      });
    }

    const owner = (prop.owner as { full_name: string; email: string; phone: string | null }) ?? {};
    return ok({
      property: {
        id: prop.id, name: prop.name ?? '', address: prop.address ?? '',
        city: prop.city ?? '', description: prop.description ?? '',
        genderPreference: prop.gender_preference ?? 'any',
        amenities: prop.amenities ?? [], rules: prop.rules ?? '',
        photos: prop.photos ?? [], isVerified: prop.is_verified ?? false,
        averageRating: prop.average_rating ?? 0, totalReviews: prop.total_reviews ?? 0,
        highlights: prop.highlights ?? [], tier: prop.tier ?? '',
        priceRange: prop.price_range ?? '', minRent: prop.min_rent ?? 0,
        owner: { fullName: owner.full_name ?? '', email: owner.email ?? '', phone: owner.phone ?? '' },
      },
      rooms: (rooms ?? []).map(r => ({
        id: r.id, roomType: r.room_type, totalBeds: r.total_beds,
        occupiedBeds: r.occupied_beds, rent: r.rent, amenities: r.amenities ?? [],
      })),
    });
  } catch (e: unknown) {
    console.error(e);
    return err('Server error', 500);
  }
}
