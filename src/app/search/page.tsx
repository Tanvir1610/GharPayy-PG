'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_PROPERTIES, ALL_AREAS, PROPERTY_STATS, type PGProperty } from '@/lib/allPropertiesData';
import { Search, MapPin, Star, Phone, SlidersHorizontal, X, Check, Users, Home, ChevronDown } from 'lucide-react';

const GENDER_OPTIONS = [
  { value: '', label: 'All Genders' },
  { value: 'female', label: '♀ Girls Only' },
  { value: 'male', label: '♂ Boys Only' },
  { value: 'any', label: '⚧ Co-ed' },
];

const AREA_OPTIONS = ['All Areas', ...ALL_AREAS];

const RENT_OPTIONS = [
  { value: 0, label: 'Any Budget' },
  { value: 10000, label: 'Under ₹10K' },
  { value: 15000, label: 'Under ₹15K' },
  { value: 20000, label: 'Under ₹20K' },
  { value: 25000, label: 'Under ₹25K' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'premium', label: '⭐ Premium' },
  { value: 'mid', label: '🏠 Mid-Range' },
  { value: 'budget', label: '💰 Budget' },
];

function PGCard({ pg }: { pg: PGProperty }) {
  const genderColor = pg.gender_preference === 'female'
    ? 'bg-pink-500' : pg.gender_preference === 'male'
    ? 'bg-blue-500' : 'bg-purple-500';
  const genderLabel = pg.gender_preference === 'female'
    ? 'Girls Only' : pg.gender_preference === 'male'
    ? 'Boys Only' : 'Co-ed';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image placeholder / area banner */}
      <div className="relative h-44 bg-gradient-to-br from-[#1a1208] to-[#2a1d0a] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,129,58,0.6) 0%, transparent 70%)' }} />
        <div className="relative text-center px-4">
          <div className="text-4xl mb-2">🏠</div>
          <p className="text-white/80 text-sm font-medium">{pg.area}</p>
          <p className="text-white/50 text-xs mt-1">{pg.locality}</p>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check size={8} />Verified
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            pg.tier === 'Classics' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-white/20 text-white'
          }`}>{pg.tier}</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${genderColor}`}>{genderLabel}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-[#1a1208] text-sm line-clamp-2 leading-tight">{pg.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-[#1a1208]">{pg.average_rating}</span>
          </div>
        </div>

        <p className="text-[11px] text-[#7a7167] flex items-center gap-1 mb-3">
          <MapPin size={10} className="shrink-0" />{pg.area}, {pg.locality}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 mb-3">
          {pg.highlights.slice(0, 3).map(h => (
            <span key={h} className="text-[10px] bg-[#f8f5f1] text-[#7a7167] px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>

        {/* Room types */}
        <p className="text-[10px] text-[#b0a99f] mb-3">{pg.room_types.slice(0, 2).join(' • ')}</p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#7a7167]">From</p>
            <p className="text-base font-bold text-[#1a1208]">
              ₹{(pg.min_rent / 1000).toFixed(0)}K
              <span className="text-xs font-normal text-[#7a7167]">/mo</span>
            </p>
          </div>
          <div className="flex gap-1.5">
            {(pg.manager_contact || pg.owner_contact) && (
              <a
                href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi GharPayy! I'm interested in ${pg.name}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors no-underline"
              >
                <Phone size={11} />Chat
              </a>
            )}
            <a
              href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi GharPayy! I'd like to know more about ${pg.name} in ${pg.area}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-[#c8813a] hover:bg-[#a96a2e] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors no-underline"
            >
              Enquire →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [gender, setGender] = useState('');
  const [area, setArea] = useState('All Areas');
  const [maxRent, setMaxRent] = useState(0);
  const [propType, setPropType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = ALL_PROPERTIES;
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.nearby_landmarks.some(l => l.toLowerCase().includes(q)) ||
        p.highlights.some(h => h.toLowerCase().includes(q))
      );
    }
    if (area && area !== 'All Areas') {
      results = results.filter(p =>
        p.area.toLowerCase().includes(area.toLowerCase()) ||
        p.locality.toLowerCase().includes(area.toLowerCase())
      );
    }
    if (gender) {
      results = results.filter(p => p.gender_preference === gender || (gender === 'any' && p.gender_preference === 'any'));
    }
    if (maxRent > 0) {
      results = results.filter(p => p.min_rent <= maxRent);
    }
    if (propType) {
      results = results.filter(p => p.property_type === propType);
    }
    return results;
  }, [query, gender, area, maxRent, propType]);

  const hasFilters = query || gender || area !== 'All Areas' || maxRent > 0 || propType;

  return (
    <div className="min-h-screen bg-[#fdf9f4]">
      {/* Header */}
      <div style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }} className="px-4 pt-10 pb-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-white/50 hover:text-white text-sm no-underline mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Browse All PGs in Bangalore
          </h1>
          <p className="text-white/50 text-sm">{PROPERTY_STATS.total}+ verified PGs across {ALL_AREAS.length} areas</p>

          {/* Search bar */}
          <div className="mt-5 flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167]" />
              <input
                type="text"
                placeholder="Search by area, landmark, property name..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white text-[#1a1208] text-sm outline-none border border-[#e8e2d8] focus:border-[#c8813a]"
              />
            </div>
            <button
              onClick={() => setShowFilters(f => !f)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${showFilters ? 'bg-[#c8813a] text-white' : 'bg-white text-[#1a1208]'}`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && <span className="w-2 h-2 rounded-full bg-red-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white border-b border-[#e8e2d8] px-4 py-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Area */}
            <div>
              <label className="text-xs font-semibold text-[#7a7167] block mb-1">Area</label>
              <div className="relative">
                <select
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="w-full appearance-none bg-[#f8f5f1] border border-[#e8e2d8] rounded-lg px-3 py-2 text-sm text-[#1a1208] outline-none focus:border-[#c8813a] pr-7"
                >
                  {AREA_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7167] pointer-events-none" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-semibold text-[#7a7167] block mb-1">Gender</label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full appearance-none bg-[#f8f5f1] border border-[#e8e2d8] rounded-lg px-3 py-2 text-sm text-[#1a1208] outline-none focus:border-[#c8813a] pr-7"
                >
                  {GENDER_OPTIONS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7167] pointer-events-none" />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-xs font-semibold text-[#7a7167] block mb-1">Max Budget</label>
              <div className="relative">
                <select
                  value={maxRent}
                  onChange={e => setMaxRent(Number(e.target.value))}
                  className="w-full appearance-none bg-[#f8f5f1] border border-[#e8e2d8] rounded-lg px-3 py-2 text-sm text-[#1a1208] outline-none focus:border-[#c8813a] pr-7"
                >
                  {RENT_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7167] pointer-events-none" />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-semibold text-[#7a7167] block mb-1">Property Type</label>
              <div className="relative">
                <select
                  value={propType}
                  onChange={e => setPropType(e.target.value)}
                  className="w-full appearance-none bg-[#f8f5f1] border border-[#e8e2d8] rounded-lg px-3 py-2 text-sm text-[#1a1208] outline-none focus:border-[#c8813a] pr-7"
                >
                  {TYPE_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7167] pointer-events-none" />
              </div>
            </div>
          </div>

          {hasFilters && (
            <div className="max-w-5xl mx-auto mt-3">
              <button
                onClick={() => { setQuery(''); setGender(''); setArea('All Areas'); setMaxRent(0); setPropType(''); }}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
              >
                <X size={12} />Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick area chips */}
      <div className="px-4 py-3 bg-white border-b border-[#e8e2d8]">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ALL_AREAS.map(a => (
            <button
              key={a}
              onClick={() => setArea(area === a ? 'All Areas' : a)}
              className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                area === a
                  ? 'bg-[#c8813a] text-white border-[#c8813a]'
                  : 'bg-white text-[#7a7167] border-[#e8e2d8] hover:border-[#c8813a] hover:text-[#c8813a]'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Stats bar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-bold text-[#1a1208]">
                {filtered.length} PG{filtered.length !== 1 ? 's' : ''} found
              </p>
              <p className="text-xs text-[#7a7167]">
                {hasFilters ? 'Showing filtered results' : `All ${PROPERTY_STATS.total} properties`}
              </p>
            </div>
            <div className="hidden sm:flex gap-3 text-xs text-[#7a7167]">
              <span className="flex items-center gap-1"><Users size={11} />Girls: {PROPERTY_STATS.girls}</span>
              <span className="flex items-center gap-1"><Home size={11} />Boys: {PROPERTY_STATS.boys}</span>
              <span className="flex items-center gap-1"><Star size={11} />Co-ed: {PROPERTY_STATS.coed}</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-lg font-bold text-[#1a1208] mb-2">No PGs match your search</h3>
              <p className="text-[#7a7167] text-sm mb-6">Try adjusting your filters or search query</p>
              <a
                href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl no-underline text-sm"
              >
                <Phone size={15} />WhatsApp us to find the right PG
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(pg => <PGCard key={pg.id} pg={pg} />)}
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full shadow-xl no-underline text-sm transition-transform hover:scale-105"
        >
          <Phone size={16} />WhatsApp Us
        </a>
      </div>
    </div>
  );
}
