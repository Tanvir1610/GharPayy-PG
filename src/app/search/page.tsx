'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Search, MapPin, Star, SlidersHorizontal, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface Property {
  _id: string;
  name: string;
  city: string;
  address: string;
  photos: string[];
  amenities: string[];
  averageRating: number;
  totalReviews: number;
  genderPreference: string;
  isVerified: boolean;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (gender) params.set('gender', gender);
    const res = await fetch(`/api/properties?${params}`);
    const json = await res.json();
    setProperties(json.data?.properties || []);
    setLoading(false);
  }, [city, gender]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (gender) params.set('gender', gender);
    router.push(`/search?${params}`);
    fetchProperties();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Filter bar */}
      <div className="bg-white border-b border-[#e8e2d8] sticky top-16 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-2 items-end">
            <div className="flex-1 min-w-48 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167]" />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search by city…"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#e8e2d8] text-sm bg-[#fdf9f4] focus:outline-none focus:border-brand"
              />
            </div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[#e8e2d8] text-sm bg-[#fdf9f4] focus:outline-none focus:border-brand"
            >
              <option value="">Any Gender</option>
              <option value="male">Male Only</option>
              <option value="female">Female Only</option>
            </select>
            <Button type="submit" size="sm">
              <Filter size={14} /> Filter
            </Button>
          </form>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#7a7167]">
            {loading ? 'Searching…' : `${properties.length} properties found`}
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-[#e8e2d8] animate-pulse h-64" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <SlidersHorizontal size={40} className="mx-auto text-[#b0a99f] mb-3" />
            <p className="text-lg font-semibold text-dark mb-1">No properties found</p>
            <p className="text-sm text-[#7a7167]">Try a different city or remove filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((p) => (
              <Link key={p._id} href={`/property/${p._id}`} className="no-underline group">
                <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="h-44 bg-[#f5f0eb] relative overflow-hidden">
                    {p.photos?.[0] ? (
                      <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#b0a99f] text-4xl font-display font-bold">
                        {p.name[0]}
                      </div>
                    )}
                    {p.isVerified && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-white/90 text-xs font-medium px-2 py-0.5 rounded-full capitalize">
                      {p.genderPreference === 'any' ? 'Co-ed' : p.genderPreference}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark text-sm mb-1 truncate">{p.name}</h3>
                    <p className="text-xs text-[#7a7167] flex items-center gap-1 mb-2">
                      <MapPin size={11} /> {p.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {p.amenities?.slice(0, 2).map((a) => (
                          <span key={a} className="text-xs bg-[#f5f0eb] text-[#7a7167] px-2 py-0.5 rounded-full">{a}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#7a7167] shrink-0">
                        <Star size={11} className="fill-brand text-brand" />
                        {p.averageRating?.toFixed(1) || 'New'}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-[#7a7167]">Loading…</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
