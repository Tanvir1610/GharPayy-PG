'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Search, MapPin, Star, SlidersHorizontal, Heart, Phone,
  Wifi, Utensils, Shield, Zap, Wind, ChevronLeft, ChevronRight,
  X, CheckCircle, Sparkles, Users, Home
} from 'lucide-react';
import Link from 'next/link';

interface Property {
  id: string; name: string; slug?: string; city: string; area?: string; address: string;
  photos: string[]; amenities: string[]; average_rating: number; total_reviews: number;
  gender_preference: string; is_verified: boolean; highlights?: string[];
  tier?: string; min_rent?: number; max_rent?: number; price_range?: string;
}

// ── Image Gallery for card ─────────────────────────────────────────────────────
function CardGallery({ photos, name }: { photos: string[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const validPhotos = photos.filter((_, i) => !imgError[i]);
  const safeIdx = Math.min(idx, Math.max(validPhotos.length - 1, 0));

  return (
    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#2a1d0a] to-[#1a1208] group">
      {validPhotos.length > 0 ? (
        <>
          <img src={validPhotos[safeIdx]} alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(prev => ({ ...prev, [photos.indexOf(validPhotos[safeIdx])]: true }))} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {validPhotos.length > 1 && <>
            <button onClick={e => { e.preventDefault(); setIdx(i => (i - 1 + validPhotos.length) % validPhotos.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10">
              <ChevronLeft size={14} /></button>
            <button onClick={e => { e.preventDefault(); setIdx(i => (i + 1) % validPhotos.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10">
              <ChevronRight size={14} /></button>
          </>}
          {validPhotos.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {validPhotos.slice(0, 6).map((_, i) => (
                <button key={i} onClick={e => { e.preventDefault(); setIdx(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === safeIdx ? 'bg-white scale-125' : 'bg-white/50'}`} />
              ))}
            </div>
          )}
          {validPhotos.length > 1 && (
            <span className="absolute bottom-2 right-3 text-white/80 text-[10px] font-medium z-10">
              {safeIdx + 1}/{validPhotos.length}
            </span>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white/40">
            <Home size={32} className="mx-auto mb-2" />
            <p className="text-xs">{name[0]}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Property Card ──────────────────────────────────────────────────────────────
function PropertyCard({ p }: { p: Property }) {
  const [saved, setSaved] = useState(false);
  const gc = p.gender_preference === 'female'
    ? { label: '♀ Girls Only', cls: 'bg-pink-50 text-pink-600 border-pink-100' }
    : p.gender_preference === 'male'
    ? { label: '♂ Boys Only',  cls: 'bg-blue-50 text-blue-600 border-blue-100' }
    : { label: '⚧ Co-ed',      cls: 'bg-purple-50 text-purple-600 border-purple-100' };
  const tierCls = p.tier === 'Classics'
    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
    : 'bg-dark text-white';
  const amenityIcons = [
    { key: 'High-Speed WiFi', Icon: Wifi }, { key: 'Meals Included', Icon: Utensils },
    { key: 'CCTV Security', Icon: Shield }, { key: 'Power Backup', Icon: Zap }, { key: 'AC Rooms', Icon: Wind },
  ];
  const minRent = p.min_rent ?? 12000;

  return (
    <Link href={`/property/${p.id}`} className="no-underline group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
        <div className="relative">
          <CardGallery photos={p.photos ?? []} name={p.name} />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-20">
            {p.is_verified && (
              <span className="flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                <CheckCircle size={9} />Verified</span>
            )}
            {p.tier && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${tierCls}`}>{p.tier}</span>}
          </div>
          <button onClick={e => { e.preventDefault(); setSaved(s => !s); }}
            className="absolute top-2.5 right-2.5 z-20 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-all">
            <Heart size={13} className={saved ? 'fill-red-500 text-red-500' : 'text-[#7a7167]'} />
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2.5">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${gc.cls}`}>{gc.label}</span>
            <div className="flex items-center gap-1">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-dark">{p.average_rating.toFixed(1)}</span>
              <span className="text-[10px] text-[#b0a99f]">({p.total_reviews})</span>
            </div>
          </div>
          <h3 className="font-bold text-dark text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-brand transition-colors">{p.name}</h3>
          <p className="text-[11px] text-[#7a7167] flex items-start gap-1 mb-3">
            <MapPin size={10} className="shrink-0 mt-0.5" />
            <span className="line-clamp-1">{p.address || `${p.area ?? 'Koramangala'}, ${p.city}`}</span>
          </p>
          {p.highlights && p.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {p.highlights.slice(0, 3).map(h => (
                <span key={h} className="text-[10px] bg-[#f8f5f1] text-[#7a7167] px-2 py-0.5 rounded-full">{h}</span>
              ))}
            </div>
          )}
          <div className="flex gap-1.5 mb-3">
            {amenityIcons.map(({ key, Icon }) => p.amenities?.includes(key) ? (
              <div key={key} title={key} className="w-7 h-7 rounded-lg bg-[#f8f5f1] flex items-center justify-center">
                <Icon size={12} className="text-brand" />
              </div>
            ) : null)}
          </div>
          <div className="mt-auto pt-3 border-t border-[#f0ebe3] flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] text-[#7a7167] mb-0.5">Starting from</p>
              <p className="text-lg font-bold text-dark leading-none">
                ₹{(minRent / 1000).toFixed(0)}K<span className="text-xs font-normal text-[#7a7167]">/mo</span>
              </p>
            </div>
            <div className="flex gap-1.5">
              <a href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi, I am interested in ${p.name}`)}`}
                target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors no-underline">
                <Phone size={11} />Chat
              </a>
              <span className="flex items-center bg-brand hover:bg-brand-dark text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer">
                View →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] animate-pulse">
      <div className="h-52 bg-gradient-to-br from-[#f5f0eb] to-[#ede7df]" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between"><div className="h-4 bg-[#f5f0eb] rounded-full w-20" /><div className="h-4 bg-[#f5f0eb] rounded-full w-12" /></div>
        <div className="h-4 bg-[#f5f0eb] rounded w-4/5" />
        <div className="h-3 bg-[#f5f0eb] rounded w-3/5" />
        <div className="flex gap-1">{[1,2,3].map(i => <div key={i} className="h-5 bg-[#f5f0eb] rounded-full w-14" />)}</div>
        <div className="h-px bg-[#f5f0eb]" />
        <div className="flex justify-between items-center"><div className="h-6 bg-[#f5f0eb] rounded w-16" /><div className="h-7 bg-[#f5f0eb] rounded-xl w-24" /></div>
      </div>
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');
  const [tier, setTier] = useState('');
  const [sort, setSort] = useState('rating');

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (city) params.set('city', city);
      if (gender) params.set('gender', gender);
      params.set('limit', '28');
      const res = await fetch(`/api/properties?${params}`);
      const json = await res.json();
      let props: Property[] = json.data?.properties || [];
      if (sort === 'rating') props = [...props].sort((a, b) => b.average_rating - a.average_rating);
      else if (sort === 'price_asc') props = [...props].sort((a, b) => (a.min_rent ?? 0) - (b.min_rent ?? 0));
      else if (sort === 'price_desc') props = [...props].sort((a, b) => (b.min_rent ?? 0) - (a.min_rent ?? 0));
      if (tier) props = props.filter(p => p.tier === tier);
      setProperties(props);
    } catch { setProperties([]); }
    setLoading(false);
  }, [city, gender, tier, sort]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (gender) params.set('gender', gender);
    router.push(`/search?${params}`);
  };

  const clearFilters = () => { setCity(''); setGender(''); setTier(''); setSort('rating'); };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />

      {/* Hero */}
      <div className="relative py-10 px-4" style={{ background: 'linear-gradient(140deg,#0a0806 0%,#1a1208 50%,#2a1d0a 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,129,58,0.4) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-brand/30">
            <Sparkles size={12} />Find Your Perfect PG
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Premium PGs across <span className="text-brand">Bangalore</span>
          </h1>
          <p className="text-white/50 text-sm mb-6">Verified, furnished, meals included — starting ₹12K/month</p>

          <form onSubmit={handleSearch} className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1 min-w-56">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="Search by city or area…"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand focus:bg-white/15 transition-all" />
            </div>
            <select value={gender} onChange={e => setGender(e.target.value)}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/10 text-white text-sm focus:outline-none focus:border-brand">
              <option value="" className="bg-dark text-dark">Any Gender</option>
              <option value="male" className="bg-dark text-dark">Boys Only</option>
              <option value="female" className="bg-dark text-dark">Girls Only</option>
              <option value="any" className="bg-dark text-dark">Co-ed</option>
            </select>
            <button type="submit" className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['Koramangala', 'BTM Layout', 'HSR Layout', 'Bellandur', 'Whitefield'].map(loc => (
              <button key={loc} onClick={() => setCity(loc)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${city === loc ? 'bg-brand text-white border-brand' : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white'}`}>
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#e8e2d8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-[#7a7167]">
              <SlidersHorizontal size={14} />
              <span className="font-medium text-dark">{loading ? '—' : properties.length}</span>
              <span>properties</span>
            </div>
            <div className="h-4 w-px bg-[#e8e2d8]" />
            <div className="flex gap-1.5">
              {['All', 'Basic Plus', 'Classics'].map(t => (
                <button key={t} onClick={() => setTier(t === 'All' ? '' : t)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${(t === 'All' && !tier) || tier === t ? 'bg-brand text-white' : 'bg-[#f8f5f1] text-[#7a7167] hover:bg-[#f0ebe3]'}`}>
                  {t}
                </button>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="ml-auto text-xs px-3 py-1.5 rounded-lg border border-[#e8e2d8] bg-[#fdf9f4] focus:outline-none focus:border-brand text-[#7a7167]">
              <option value="rating">⭐ Top Rated</option>
              <option value="price_asc">₹ Low → High</option>
              <option value="price_desc">₹ High → Low</option>
            </select>
            {(city || gender || tier) && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-brand hover:text-brand-dark font-medium">
                <X size={12} />Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {!loading && properties.length > 0 && (
        <div className="bg-white border-b border-[#e8e2d8]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">
            {[
              { icon: Home, label: 'Properties', value: `${properties.length}+` },
              { icon: CheckCircle, label: 'Verified', value: `${properties.filter(p => p.is_verified).length}` },
              { icon: Users, label: 'Happy Tenants', value: '1000+' },
              { icon: Star, label: 'Avg Rating', value: (properties.reduce((s, p) => s + p.average_rating, 0) / properties.length).toFixed(1) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center"><Icon size={14} className="text-brand" /></div>
                <div><p className="text-sm font-bold text-dark leading-none">{value}</p><p className="text-[10px] text-[#7a7167]">{label}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-[#f5f0eb] rounded-full flex items-center justify-center mx-auto mb-5">
              <Search size={32} className="text-[#b0a99f]" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">No properties found</h3>
            <p className="text-[#7a7167] mb-6 text-sm">Try a different city or adjust your filters</p>
            <button onClick={clearFilters} className="bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors">
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {(!city || city.toLowerCase().includes('koramangala') || city.toLowerCase().includes('bangalore')) && (
              <div className="mb-6 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#0a0806 0%,#2a1d0a 100%)' }}>
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(200,129,58,0.5) 0%, transparent 70%)' }} />
                <div className="relative px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5"><MapPin size={13} className="text-brand" /><span className="text-brand text-xs font-semibold">Koramangala, Bangalore</span></div>
                    <h2 className="text-white font-bold text-lg leading-tight">{properties.length} Premium PGs near Christ University</h2>
                    <p className="text-white/50 text-xs mt-1">Verified · Furnished · Meals Included · Starting ₹12K/mo</p>
                  </div>
                  <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20am%20looking%20for%20a%20PG%20in%20Koramangala"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors no-underline">
                    <Phone size={13} />Get Best Deal
                  </a>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {properties.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>

            <div className="mt-12 text-center py-10 px-4 rounded-2xl bg-dark">
              <h3 className="text-white font-bold text-xl mb-2">Can&apos;t find the right PG?</h3>
              <p className="text-white/50 text-sm mb-5">WhatsApp us and we&apos;ll shortlist the best options for your budget.</p>
              <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors no-underline">
                <Phone size={16} />+91 83073 96042
              </a>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fdf9f4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-brand border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-[#7a7167] text-sm">Finding properties…</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
