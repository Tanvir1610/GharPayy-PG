'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin, Star, ChevronLeft, ChevronRight,
  Search, SlidersHorizontal, Check, Users,
  Sparkles, Wifi, Utensils, Shield,
} from 'lucide-react';

interface Property {
  id: string; name: string; slug: string; address: string;
  genderPreference: string; photos: string[]; amenities: string[];
  averageRating: number; totalReviews: number; isVerified: boolean;
  highlights: string[]; priceRange: string; tier: string;
  minRent: number; maxRent: number;
}

function PropertyCard({ p }: { p: Property }) {
  const [imgIdx, setImgIdx] = useState(0);
  const prev = (e: React.MouseEvent) => { e.preventDefault(); setImgIdx(i => (i - 1 + p.photos.length) % p.photos.length); };
  const next = (e: React.MouseEvent) => { e.preventDefault(); setImgIdx(i => (i + 1) % p.photos.length); };
  const genderLabel = p.genderPreference === 'female' ? '👩 Girls Only' : p.genderPreference === 'male' ? '👦 Boys Only' : '🤝 Co-ed';
  const genderColor = p.genderPreference === 'female' ? 'bg-pink-100 text-pink-700' : p.genderPreference === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';

  return (
    <Link href={`/property/${p.id}`} className="group block rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 no-underline">
      <div className="relative h-52 bg-[#f5f0eb] overflow-hidden">
        {p.photos.length > 0 ? (
          <img src={p.photos[imgIdx]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#b0a99f]">{p.name[0]}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {p.photos.length > 1 && <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"><ChevronLeft size={16} /></button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"><ChevronRight size={16} /></button>
        </>}
        {p.photos.length > 1 && <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">{imgIdx + 1}/{p.photos.length}</div>}
        {p.photos.length > 1 && p.photos.length <= 10 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {p.photos.map((_, i) => <button key={i} onClick={e => { e.preventDefault(); setImgIdx(i); }} className={`h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white w-3' : 'bg-white/50 w-1.5'}`} />)}
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.isVerified && <span className="flex items-center gap-1 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow"><Check size={9} /> Verified</span>}
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full shadow ${genderColor}`}>{genderLabel}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full shadow ${p.tier === 'Classics' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-700'}`}>
            {p.tier === 'Classics' ? '⭐ Classics' : '✓ Basic Plus'}
          </span>
        </div>
        <div className="absolute bottom-8 left-3">
          <span className="bg-[#c8813a] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">SAVE ₹1K PRE-BOOKING</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#0e0c0a] text-sm leading-tight group-hover:text-[#c8813a] transition-colors line-clamp-2">{p.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="fill-[#c8813a] text-[#c8813a]" />
            <span className="text-xs font-bold">{p.averageRating.toFixed(1)}</span>
          </div>
        </div>
        <p className="flex items-center gap-1 text-xs text-[#7a7167] mb-3"><MapPin size={10} className="text-[#c8813a] shrink-0" /><span className="truncate">{p.address}</span></p>
        <div className="flex flex-wrap gap-1 mb-3">
          {p.highlights.slice(0, 3).map(h => <span key={h} className="text-[10px] bg-[#f8f5f1] text-[#7a7167] px-2 py-0.5 rounded-full border border-[#e8e2d8]">{h}</span>)}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[#f5f0eb]">
          <div>
            <span className="text-xs text-[#7a7167]">Starting</span>
            <p className="font-bold text-[#0e0c0a] text-base leading-tight">{p.priceRange}<span className="text-xs font-normal text-[#7a7167]">/mo</span></p>
          </div>
          <span className="text-xs font-semibold text-[#c8813a] bg-[#c8813a]/10 px-3 py-1.5 rounded-xl group-hover:bg-[#c8813a] group-hover:text-white transition-colors">Stay Here →</span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white animate-pulse">
      <div className="h-52 bg-[#f0ebe3]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#f0ebe3] rounded w-3/4" />
        <div className="h-3 bg-[#f0ebe3] rounded w-1/2" />
        <div className="flex gap-2"><div className="h-5 bg-[#f0ebe3] rounded-full w-16" /><div className="h-5 bg-[#f0ebe3] rounded-full w-20" /></div>
        <div className="h-8 bg-[#f0ebe3] rounded w-full mt-2" />
      </div>
    </div>
  );
}

export default function KoramangalaClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('all');
  const [tier, setTier] = useState('all');
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    fetch('/api/koramangala')
      .then(r => r.json())
      .then(j => { if (j.success) setProperties(j.data); else setError('Failed to load properties'); })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...properties];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase()));
    if (gender !== 'all') { if (gender === 'coed') list = list.filter(p => p.genderPreference === 'any'); else list = list.filter(p => p.genderPreference === gender); }
    if (tier !== 'all') list = list.filter(p => p.tier.toLowerCase().includes(tier));
    if (sort === 'rating') list.sort((a, b) => b.averageRating - a.averageRating);
    if (sort === 'price-low') list.sort((a, b) => a.minRent - b.minRent);
    if (sort === 'price-high') list.sort((a, b) => b.minRent - a.minRent);
    return list;
  }, [properties, search, gender, tier, sort]);

  const stats = { total: properties.length, girls: properties.filter(p => p.genderPreference === 'female').length, boys: properties.filter(p => p.genderPreference === 'male').length, coed: properties.filter(p => p.genderPreference === 'any').length };

  const TRUST = [
    [<Wifi key="w" size={13}/>, 'Free High-Speed WiFi'],
    [<Utensils key="u" size={13}/>, 'Meals Included'],
    [<Shield key="s" size={13}/>, '24×7 CCTV Security'],
    [<Check key="c" size={13}/>, 'Save ₹1K on Pre-booking'],
    [<Users key="us" size={13}/>, 'Christ Uni & NIFT Students'],
  ] as [React.ReactNode, string][];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a0806 0%,#1a1208 50%,#2a1d0a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%,rgba(200,129,58,.18) 0%,transparent 65%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-0">
          <div className="flex gap-2 h-44 rounded-2xl overflow-hidden mb-8 opacity-60">
            {['korvek/1.jpg','koravillgirls/1.jpg','zexxk/1.jpeg','zeddluxecoed/1.jpeg','orangecapitalk/1.jpg'].map((slug, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? 'flex-[2]' : 'flex-1'} ${i > 2 ? 'hidden sm:block' : ''}`}>
                <img src={`https://gharpayy.com/xAssets/cards/koramangala/${slug}`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={12} className="text-[#c8813a]" />
              {loading ? 'Loading...' : `${stats.total} Premium PGs Available`}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
              PGs in <span className="text-[#c8813a]">Koramangala</span>
            </h1>
            <p className="text-white/70 text-base max-w-xl">Prime Koramangala living for students &amp; young professionals. Steps from Christ University, Forum Mall &amp; top tech companies.</p>
            {!loading && (
              <div className="flex flex-wrap justify-center gap-3 mt-5">
                {[['👩', `${stats.girls} Girls`], ['👦', `${stats.boys} Boys`], ['🤝', `${stats.coed} Co-ed`]].map(([icon, label]) => (
                  <span key={String(label)} className="flex items-center gap-1.5 bg-white/10 backdrop-blur text-white text-sm px-3 py-1.5 rounded-full border border-white/20">{icon} {label}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/20 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            {TRUST.map(([icon, label]) => <span key={String(label)} className="flex items-center gap-1.5"><span className="text-[#c8813a]">{icon}</span> {label}</span>)}
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-[#e8e2d8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search PGs..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#e8e2d8] text-sm bg-[#fdf9f4] focus:outline-none focus:border-[#c8813a]" />
          </div>
          <div className="flex rounded-xl border border-[#e8e2d8] overflow-hidden text-xs font-semibold">
            {[['all','All'],['female','Girls'],['male','Boys'],['coed','Co-ed']].map(([val, label]) => (
              <button key={val} onClick={() => setGender(val)} className={`px-3 py-2 transition-colors ${gender === val ? 'bg-[#c8813a] text-white' : 'text-[#7a7167] hover:bg-[#f5f0eb]'}`}>{label}</button>
            ))}
          </div>
          <select value={tier} onChange={e => setTier(e.target.value)} className="px-3 py-2 rounded-xl border border-[#e8e2d8] text-sm focus:outline-none focus:border-[#c8813a] bg-white">
            <option value="all">All Tiers</option><option value="basic">Basic Plus</option><option value="classics">Classics</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 rounded-xl border border-[#e8e2d8] text-sm focus:outline-none focus:border-[#c8813a] bg-white">
            <option value="rating">Top Rated</option><option value="price-low">Price: Low→High</option><option value="price-high">Price: High→Low</option>
          </select>
          <span className="text-xs text-[#7a7167] ml-auto hidden sm:block">
            <SlidersHorizontal size={12} className="inline mr-1" />
            {loading ? 'Loading...' : `${filtered.length} of ${properties.length} properties`}
          </span>
        </div>
      </div>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error ? (
          <div className="text-center py-20 text-red-500">
            <p className="font-semibold">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-3 text-[#c8813a] font-semibold text-sm hover:underline">Try again</button>
          </div>
        ) : loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#7a7167]">
            <SlidersHorizontal size={40} className="mx-auto mb-3 text-[#b0a99f]" />
            <p className="font-semibold text-lg">No properties match your filters</p>
            <button onClick={() => { setSearch(''); setGender('all'); setTier('all'); }} className="mt-3 text-[#c8813a] font-semibold text-sm hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{filtered.map(p => <PropertyCard key={p.id} p={p} />)}</div>
        )}

        {!loading && !error && (
          <div className="mt-16 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a0806,#1a1208)' }}>
            <div className="px-8 py-10 text-center">
              <p className="text-[#c8813a] text-sm font-semibold uppercase tracking-wider mb-2">Ready to Move In?</p>
              <h2 className="text-2xl font-bold text-white mb-3">Book a Free Site Visit Today</h2>
              <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">No booking fee. No pressure. Just come see the space and decide at your own pace.</p>
              <a href="https://api.whatsapp.com/send?phone=+918307396042&text=Heyy!%20GHARPAYY,%20I%20am%20looking%20for%20a%20PG%20in%20Koramangala" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3 rounded-xl transition-colors no-underline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.546 4.07 1.5 5.789L0 24l6.344-1.487A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.513-5.17-1.4l-.37-.22-3.768.883.899-3.678-.242-.38A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp for Free Visit
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
