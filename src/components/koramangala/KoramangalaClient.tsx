'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MapPin, Star, Wifi, Utensils, Shield, Zap, Wind, ChevronLeft, ChevronRight, X, Search, SlidersHorizontal, Heart, Phone } from 'lucide-react';

interface Property {
  id: string; name: string; slug: string; address: string;
  gender_preference: string; photos: string[]; amenities: string[];
  average_rating: number; total_reviews: number; is_verified: boolean;
  highlights: string[]; price_range: string; tier: string;
  min_rent: number; max_rent: number;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ photos, start, onClose }: { photos: string[]; start: number; onClose: () => void }) {
  const [idx, setIdx] = useState(start);
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx(i => (i + 1) % photos.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div className="fixed inset-0 z-[999] bg-black/95 flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10" onClick={e => e.stopPropagation()}>
        <span className="text-white/70 text-sm">{idx + 1} / {photos.length}</span>
        <button onClick={onClose} className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"><X size={20} /></button>
      </div>
      <div className="flex-1 flex items-center justify-center relative px-4" onClick={e => e.stopPropagation()}>
        <button onClick={prev} className="absolute left-3 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"><ChevronLeft size={22} /></button>
        <img src={photos[idx]} alt="" className="max-h-[80vh] max-w-full object-contain rounded-xl" />
        <button onClick={next} className="absolute right-3 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"><ChevronRight size={22} /></button>
      </div>
      <div className="px-4 py-3 overflow-x-auto" onClick={e => e.stopPropagation()}>
        <div className="flex gap-2 w-max mx-auto">
          {photos.map((p, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 transition-all ${i === idx ? 'ring-2 ring-brand scale-105' : 'opacity-50 hover:opacity-80'}`}>
              <img src={p} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Property Image Gallery ─────────────────────────────────────────────────────
function PropertyGallery({ photos, onOpen }: { photos: string[]; onOpen: (i: number) => void }) {
  const [active, setActive] = useState(0);

  if (!photos.length) return <div className="h-52 bg-[#f5f0eb] rounded-2xl flex items-center justify-center text-[#b0a99f]">No photos</div>;

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative h-52 rounded-2xl overflow-hidden cursor-zoom-in group" onClick={() => onOpen(active)}>
        <img src={photos[active]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {photos.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-center justify-between">
            <div className="flex gap-1">
              {photos.slice(0, 6).map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setActive(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? 'bg-white scale-125' : 'bg-white/50'}`} />
              ))}
            </div>
            <span className="text-white/80 text-xs font-medium">{photos.length} photos</span>
          </div>
        )}
        {/* Prev/Next arrows */}
        {photos.length > 1 && <>
          <button onClick={e => { e.stopPropagation(); setActive(i => (i - 1 + photos.length) % photos.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all">
            <ChevronLeft size={14} />
          </button>
          <button onClick={e => { e.stopPropagation(); setActive(i => (i + 1) % photos.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all">
            <ChevronRight size={14} />
          </button>
        </>}
      </div>
      {/* Thumbnail strip */}
      {photos.length > 1 && (
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none">
          {photos.map((p, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`relative shrink-0 w-12 h-10 rounded-lg overflow-hidden transition-all ${i === active ? 'ring-2 ring-brand scale-105' : 'opacity-60 hover:opacity-90'}`}>
              <img src={p} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          {photos.length > 6 && (
            <button onClick={() => onOpen(0)}
              className="shrink-0 w-12 h-10 rounded-lg bg-black/80 text-white text-xs font-bold flex items-center justify-center hover:bg-black transition-colors">
              +{photos.length - 6}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Property Card ──────────────────────────────────────────────────────────────
function PropertyCard({ p }: { p: Property }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const genderColor = p.gender_preference === 'female' ? 'bg-pink-50 text-pink-600' :
                      p.gender_preference === 'male'   ? 'bg-blue-50 text-blue-600' :
                                                         'bg-purple-50 text-purple-600';
  const genderLabel = p.gender_preference === 'female' ? '♀ Girls Only' :
                      p.gender_preference === 'male'   ? '♂ Boys Only' : '⚧ Co-ed';

  const amenityIcons: Record<string, typeof Wifi> = {
    'High-Speed WiFi': Wifi, 'Meals Included': Utensils,
    'CCTV Security': Shield, 'Power Backup': Zap, 'AC Rooms': Wind,
  };

  return (
    <>
      {lightbox !== null && <Lightbox photos={p.photos} start={lightbox} onClose={() => setLightbox(null)} />}
      <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {/* Gallery */}
        <div className="p-3 pb-0">
          <div className="relative">
            <PropertyGallery photos={p.photos} onOpen={i => setLightbox(i)} />
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {p.is_verified && (
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  ✓ Verified
                </span>
              )}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.tier === 'Classics' ? 'bg-brand text-white' : 'bg-dark text-white'}`}>
                {p.tier}
              </span>
            </div>
            {/* Save button */}
            <button onClick={() => setSaved(s => !s)}
              className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow transition-all">
              <Heart size={14} className={saved ? 'fill-red-500 text-red-500' : 'text-[#7a7167]'} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Gender + Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${genderColor}`}>{genderLabel}</span>
            <div className="flex items-center gap-1">
              <Star size={11} className="fill-brand text-brand" />
              <span className="text-xs font-semibold text-dark">{p.average_rating.toFixed(1)}</span>
              <span className="text-xs text-[#b0a99f]">({p.total_reviews})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-bold text-dark text-sm leading-tight mb-1 line-clamp-2">{p.name}</h3>

          {/* Address */}
          <p className="text-xs text-[#7a7167] flex items-center gap-1 mb-3">
            <MapPin size={10} className="shrink-0" />{p.address}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1 mb-3">
            {p.highlights.slice(0, 3).map(h => (
              <span key={h} className="text-[10px] bg-[#f8f5f1] text-[#7a7167] px-2 py-0.5 rounded-full">{h}</span>
            ))}
          </div>

          {/* Amenity icons */}
          <div className="flex gap-2 mb-3">
            {Object.entries(amenityIcons).map(([name, Icon]) =>
              p.amenities.includes(name) ? (
                <div key={name} title={name} className="w-7 h-7 rounded-lg bg-[#f8f5f1] flex items-center justify-center">
                  <Icon size={13} className="text-brand" />
                </div>
              ) : null
            )}
          </div>

          {/* Price + CTA */}
          <div className="mt-auto flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-[#7a7167]">Starting from</p>
              <p className="text-lg font-bold text-dark">₹{(p.min_rent/1000).toFixed(0)}K<span className="text-xs font-normal text-[#7a7167]">/mo</span></p>
            </div>
            <div className="flex gap-1.5">
              <a href="https://api.whatsapp.com/send?phone=+918307396042&text=Hi, I am interested in " + encodeURIComponent(p.name)
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors no-underline">
                <Phone size={12} />Chat
              </a>
              <Link href={`/property/${p.id}`}
                className="bg-brand hover:bg-brand-dark text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors no-underline">
                View →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function KoramangalaClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('all');
  const [tier, setTier] = useState('all');
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    fetch('/api/koramangala').then(r => r.json()).then(j => {
      setProperties(j.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const applyFilters = useCallback(() => {
    let list = [...properties];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase()));
    if (gender !== 'all') list = list.filter(p => p.gender_preference === gender);
    if (tier !== 'all') list = list.filter(p => p.tier === tier);
    if (sort === 'rating') list.sort((a, b) => b.average_rating - a.average_rating);
    else if (sort === 'price_asc') list.sort((a, b) => a.min_rent - b.min_rent);
    else if (sort === 'price_desc') list.sort((a, b) => b.min_rent - a.min_rent);
    setFiltered(list);
  }, [properties, search, gender, tier, sort]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const stats = [
    { label: 'Properties', value: properties.length + '+' },
    { label: 'Verified', value: properties.filter(p => p.is_verified).length + '' },
    { label: 'Happy Tenants', value: '1000+' },
    { label: 'Avg Rating', value: properties.length ? (properties.reduce((s, p) => s + p.average_rating, 0) / properties.length).toFixed(1) : '4.8' },
  ];

  return (
    <div className="min-h-screen bg-[#fdf9f4]">
      {/* Hero */}
      <section style={{ background: 'linear-gradient(140deg,#0a0806 0%,#1a1208 50%,#2a1d0a 100%)' }} className="relative overflow-hidden">
        {/* Background image strip */}
        {!loading && properties.length > 0 && (
          <div className="absolute inset-0 opacity-15">
            <div className="flex h-full">
              {properties.slice(0, 5).map((p, i) => (
                <div key={i} className="flex-1 relative overflow-hidden">
                  <img src={p.photos[0]} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-brand/30">
            <MapPin size={12} />Koramangala, Bangalore
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Live in the Heart of<br/><span className="text-brand">Koramangala</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            Premium PGs near Christ University, Flipkart, Swiggy & Forum Mall. Verified, furnished, meals included.
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-6 sm:gap-12 mb-10">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{loading ? '—' : s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a href="https://api.whatsapp.com/send?phone=+918307396042&text=Hi GharPayy! I am looking for a PG in Koramangala"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors no-underline text-sm">
            <Phone size={16} />WhatsApp Us — Get Best Deal
          </a>
        </div>
      </section>

      {/* Filters bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#e8e2d8] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-44">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167]" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search properties…"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#e8e2d8] bg-[#fdf9f4] text-sm focus:outline-none focus:border-brand" />
            </div>
            {/* Gender */}
            <select value={gender} onChange={e => setGender(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#e8e2d8] bg-[#fdf9f4] text-sm focus:outline-none focus:border-brand">
              <option value="all">All Genders</option>
              <option value="female">Girls Only</option>
              <option value="male">Boys Only</option>
              <option value="any">Co-ed</option>
            </select>
            {/* Tier */}
            <select value={tier} onChange={e => setTier(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#e8e2d8] bg-[#fdf9f4] text-sm focus:outline-none focus:border-brand">
              <option value="all">All Tiers</option>
              <option value="Basic Plus">Basic Plus</option>
              <option value="Classics">Classics</option>
            </select>
            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#e8e2d8] bg-[#fdf9f4] text-sm focus:outline-none focus:border-brand">
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
            <div className="flex items-center gap-1.5 text-sm text-[#7a7167] ml-auto shrink-0">
              <SlidersHorizontal size={14} />
              <span>{filtered.length} results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8]">
                <div className="h-52 bg-[#f5f0eb] animate-pulse m-3 rounded-2xl" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-[#f5f0eb] animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-[#f5f0eb] animate-pulse rounded w-1/2" />
                  <div className="h-8 bg-[#f5f0eb] animate-pulse rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🏠</p>
            <h3 className="text-xl font-bold text-dark mb-2">No properties found</h3>
            <p className="text-[#7a7167] mb-6">Try adjusting your filters</p>
            <button onClick={() => { setSearch(''); setGender('all'); setTier('all'); }}
              className="bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <section className="bg-dark text-white py-14 px-4 mt-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Ready to find your perfect PG?</h2>
        <p className="text-white/60 mb-6 max-w-md mx-auto">Talk to us on WhatsApp and we'll help you find the best match in Koramangala.</p>
        <a href="https://api.whatsapp.com/send?phone=+918307396042&text=Hi GharPayy! I am looking for a PG in Koramangala"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors no-underline">
          <Phone size={18} />+91 83073 96042
        </a>
      </section>
    </div>
  );
}
