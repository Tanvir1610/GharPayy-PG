import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, notFound } from '@/lib/api';
import { KORAMANGALA_PROPERTIES } from '@/lib/koramangalaData';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const [{ data: prop, error }, { data: rooms }] = await Promise.all([
      supabase.from('properties').select('*, owner:profiles!owner_id(full_name,email,phone)').eq('id', id).single(),
      supabase.from('rooms').select('*').eq('property_id', id),
    ]);

    if (error || !prop) {
      // Try static data fallback for Koramangala properties
      const staticProp = KORAMANGALA_PROPERTIES.find(p => p.id === id || p.slug === id);
      if (!staticProp) return notFound('Property');

      return ok({
        property: {
          id: staticProp.id, name: staticProp.name, address: staticProp.address,
          city: staticProp.city, description: staticProp.description,
          genderPreference: staticProp.gender_preference,
          amenities: staticProp.amenities, rules: 'No smoking inside\nGuests allowed until 10 PM\nMinimum stay: 1 month\nID proof mandatory',
          photos: staticProp.photos, isVerified: staticProp.is_verified,
          averageRating: staticProp.average_rating, totalReviews: staticProp.total_reviews,
          highlights: staticProp.highlights, tier: staticProp.tier,
          priceRange: staticProp.price_range, minRent: staticProp.min_rent,
          owner: { fullName: 'GharPayy Team', email: 'hello@gharpayy.com', phone: '+91 83073 96042' },
        },
        rooms: [
          { id: `${staticProp.id}-double`, roomType: 'double', totalBeds: 2, occupiedBeds: 1, rent: staticProp.min_rent, amenities: staticProp.amenities.slice(0, 6) },
          { id: `${staticProp.id}-single`, roomType: 'single', totalBeds: 1, occupiedBeds: 0, rent: staticProp.max_rent, amenities: staticProp.amenities },
        ],
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
