'use client';

import { useEffect, useState } from 'react';
import PropertyGallery from './PropertyGallery';
import PropertyInfo from './PropertyInfo';

interface Room { id: string; roomType: string; totalBeds: number; occupiedBeds: number; rent: number; amenities: string[] }
interface PropertyData {
  id: string; name: string; address: string; city: string; description: string;
  genderPreference: string; amenities: string[]; rules: string; photos: string[];
  isVerified: boolean; averageRating: number; totalReviews: number;
  highlights: string[]; tier: string; priceRange: string; minRent: number;
  owner: { fullName: string; email: string; phone: string };
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[520px] bg-[#f0ebe3]" />
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 bg-[#f0ebe3] rounded w-2/3" />
          <div className="h-4 bg-[#f0ebe3] rounded w-1/2" />
          <div className="h-4 bg-[#f0ebe3] rounded w-full" />
          <div className="h-4 bg-[#f0ebe3] rounded w-3/4" />
        </div>
        <div className="space-y-3">
          <div className="h-48 bg-[#f0ebe3] rounded-2xl" />
          <div className="h-32 bg-[#f0ebe3] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetailClient({ id }: { id: string }) {
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/properties/detail/${id}`)
      .then(r => r.json())
      .then(j => {
        if (j.success) {
          setProperty(j.data.property);
          setRooms(j.data.rooms);
        } else {
          setError('Property not found');
        }
      })
      .catch(() => setError('Failed to load property'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Skeleton />;

  if (error || !property) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-center">
        <div>
          <p className="text-6xl font-bold text-[#e8e2d8] mb-4">404</p>
          <p className="text-lg font-semibold text-[#0e0c0a] mb-2">Property not found</p>
          <p className="text-sm text-[#7a7167]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PropertyGallery photos={property.photos} name={property.name} isVerified={property.isVerified} />
      <PropertyInfo property={property} rooms={rooms} />
    </>
  );
}
