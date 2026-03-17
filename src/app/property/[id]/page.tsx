import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ALL_PROPERTIES } from '@/lib/allPropertiesData';
import { getPropertyPhotos } from '@/lib/images';
import {
  MapPin, Phone, Star, Check, ArrowLeft, Wifi, Utensils, Shield,
  Zap, Home, Dumbbell, Wind, Coffee, Car, Tv, BookOpen, Flame,
  ChevronRight, Users, Clock, Calendar, Banknote
} from 'lucide-react';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return ALL_PROPERTIES.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = ALL_PROPERTIES.find(x => x.id === id || x.slug === id);
  if (!p) return {};
  return {
    title: `${p.name} — GharPayy | PG in ${p.area}, Bangalore`,
    description: `${p.name} in ${p.area}, Bangalore. ${p.room_types.join(', ')}. From ₹${p.min_rent/1000}K/mo. ${p.highlights.join(' · ')}. No brokerage.`,
  };
}

const AMENITY_ICONS: Record<string, React.ElementType> = {
  'WiFi': Wifi, 'Wifi': Wifi, 'Gym': Dumbbell, 'AC': Wind,
  'Meals': Utensils, 'Food': Utensils, 'CCTV': Shield, 'Security': Shield,
  'Power Backup': Zap, 'Elevator': Home, 'Fridge': Coffee, 'Parking': Car,
  'TV': Tv, 'Library': BookOpen, 'Rooftop': Flame,
};

function AmenityBadge({ name }: { name: string }) {
  const key = Object.keys(AMENITY_ICONS).find(k => name.toLowerCase().includes(k.toLowerCase()));
  const Icon = key ? AMENITY_ICONS[key] : Check;
  return (
    <div className="flex items-center gap-2 p-3 bg-[#f8f5f1] rounded-xl border border-[#e8e2d8]">
      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
        <Icon size={15} className="text-brand" />
      </div>
      <span className="text-xs font-medium text-[#1a1208]">{name}</span>
    </div>
  );
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const p = ALL_PROPERTIES.find(x => x.id === id || x.slug === id);
  if (!p) notFound();

  const genderColor = p.gender_preference === 'female' ? 'bg-pink-500' : p.gender_preference === 'male' ? 'bg-blue-500' : 'bg-purple-500';
  const genderLabel = p.gender_preference === 'female' ? 'Girls Only' : p.gender_preference === 'male' ? 'Boys Only' : 'Co-ed';

  // Real photos from gharpayy.com
  const photos = getPropertyPhotos(p.id).length > 0 ? getPropertyPhotos(p.id) : p.photos;
  const mainPhoto = photos[0];
  const thumbPhotos = photos.slice(1, 5);

  // Related: same area, different property
  const related = ALL_PROPERTIES.filter(x => x.area === p.area && x.id !== p.id).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e8e2d8] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-[#7a7167]">
          <Link href="/" className="hover:text-brand no-underline transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/search" className="hover:text-brand no-underline transition-colors">Search</Link>
          <ChevronRight size={12} />
          <Link href={`/search?area=${encodeURIComponent(p.area)}`} className="hover:text-brand no-underline transition-colors">{p.area}</Link>
          <ChevronRight size={12} />
          <span className="text-[#1a1208] font-medium truncate max-w-[200px]">{p.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 w-full flex-1">
        {/* Back */}
        <Link href="/search" className="inline-flex items-center gap-1.5 text-sm text-[#7a7167] hover:text-brand mb-5 no-underline transition-colors">
          <ArrowLeft size={14} />Back to Search
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image / gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1a1208]">
              {/* Main photo */}
              <div className="relative h-56 sm:h-80">
                <img
                  src={mainPhoto}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check size={9} />Verified
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white ${p.tier === 'Classics' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-white/20'}`}>
                    {p.tier}
                  </span>
                </div>
                <span className={`absolute bottom-4 left-4 text-[11px] font-semibold px-2.5 py-1 rounded-full text-white ${genderColor}`}>{genderLabel}</span>
                {photos.length > 1 && (
                  <span className="absolute bottom-4 right-4 bg-black/50 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm">
                    1 / {photos.length} photos
                  </span>
                )}
              </div>
              {/* Thumbnail strip */}
              {thumbPhotos.length > 0 && (
                <div className="grid grid-cols-4 gap-1 p-1">
                  {thumbPhotos.map((src, i) => (
                    <div key={i} className="relative h-20 overflow-hidden rounded-lg bg-[#1a1208]">
                      <img src={src} alt={`${p.name} photo ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title + Rating */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-2">{p.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#1a1208]">{p.average_rating}</span>
                  <span className="text-sm text-[#7a7167]">({p.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#7a7167]">
                  <MapPin size={13} className="text-brand" />{p.area}, {p.city}
                </div>
                {p.google_maps_url && (
                  <a href={p.google_maps_url} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-brand hover:underline no-underline">
                    View on Maps →
                  </a>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {p.highlights.map(h => (
                <span key={h} className="flex items-center gap-1.5 text-sm bg-brand/10 text-brand font-semibold px-3 py-1.5 rounded-full">
                  <Check size={11} />{h}
                </span>
              ))}
            </div>

            {/* Key Details */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5">
              <h2 className="font-bold text-[#1a1208] mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Home, label: 'Room Types', val: p.room_types.slice(0,2).join(', ') },
                  { icon: Utensils, label: 'Meals/Day', val: p.meals_included > 0 ? `${p.meals_included} meals` : 'Self-cook' },
                  { icon: Check, label: 'Food', val: p.food_type === 'veg' ? 'Veg Only' : p.food_type === 'non-veg' ? 'Non-Veg' : p.food_type === 'both' ? 'Veg & Non-Veg' : 'Self-Cook' },
                  { icon: Users, label: 'Gender', val: genderLabel },
                  { icon: Clock, label: 'Curfew', val: p.no_curfew ? 'No Curfew' : 'Has Curfew' },
                  { icon: Calendar, label: 'Min Stay', val: p.minimum_stay },
                  { icon: Banknote, label: 'Deposit', val: p.security_deposit },
                  { icon: Zap, label: 'Utilities', val: p.electricity_extra ? 'Electricity Extra' : 'All Inclusive' },
                  { icon: MapPin, label: 'Noise', val: p.noise_level.charAt(0).toUpperCase() + p.noise_level.slice(1) },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#7a7167]">{label}</p>
                      <p className="text-xs font-semibold text-[#1a1208]">{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5">
              <h2 className="font-bold text-[#1a1208] mb-4">Pricing</h2>
              {p.price_range ? (
                <p className="text-sm text-[#7a7167] mb-3">{p.price_range}</p>
              ) : null}
              <div className="flex items-center gap-4">
                <div className="bg-brand/10 rounded-xl px-5 py-3 text-center">
                  <p className="text-[10px] text-[#7a7167]">Starting from</p>
                  <p className="text-2xl font-bold text-[#1a1208]">₹{(p.min_rent/1000).toFixed(0)}K<span className="text-sm font-normal text-[#7a7167]">/mo</span></p>
                </div>
                {p.max_rent > p.min_rent && (
                  <div className="bg-[#f8f5f1] rounded-xl px-5 py-3 text-center">
                    <p className="text-[10px] text-[#7a7167]">Up to</p>
                    <p className="text-2xl font-bold text-[#1a1208]">₹{(p.max_rent/1000).toFixed(0)}K<span className="text-sm font-normal text-[#7a7167]">/mo</span></p>
                  </div>
                )}
              </div>
              <p className="text-xs text-[#7a7167] mt-3 flex items-center gap-1.5">
                <Check size={11} className="text-emerald-500" />
                {p.utilities_included ? 'Electricity + Water + WiFi + Maintenance all included' : 'Electricity billed separately'}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5">
              <h2 className="font-bold text-[#1a1208] mb-4">Amenities & Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[...p.amenities, ...p.safety_features].map(a => <AmenityBadge key={a} name={a} />)}
              </div>
            </div>

            {/* Nearby */}
            {p.nearby_landmarks.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5">
                <h2 className="font-bold text-[#1a1208] mb-4">Nearby Landmarks</h2>
                <div className="flex flex-wrap gap-2">
                  {p.nearby_landmarks.map(l => (
                    <span key={l} className="flex items-center gap-1.5 text-sm bg-[#f8f5f1] text-[#7a7167] px-3 py-1.5 rounded-full border border-[#e8e2d8]">
                      <MapPin size={11} className="text-brand" />{l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky CTA card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5 shadow-sm">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-[#1a1208]">₹{(p.min_rent/1000).toFixed(0)}K</span>
                  <span className="text-[#7a7167] text-sm">/month onwards</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">{p.average_rating}</span>
                  <span className="text-xs text-[#7a7167]">· {p.total_reviews} reviews</span>
                </div>
                <div className="space-y-2.5 mb-5 text-sm">
                  <div className="flex items-center gap-2 text-[#1a1208]">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    {genderLabel} property
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1208]">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    {p.meals_included > 0 ? `${p.meals_included} meals included daily` : 'Self-cook facility'}
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1208]">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    {p.utilities_included ? 'All utilities included' : 'Basic utilities included'}
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1208]">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    {p.no_curfew ? 'No curfew restrictions' : 'Flexible timings'}
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1208]">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    Min stay: {p.minimum_stay}
                  </div>
                </div>

                <a href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi GharPayy! I'm interested in ${p.name} in ${p.area}. Please share more details and availability.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors no-underline mb-2">
                  <Phone size={15} />WhatsApp to Book
                </a>
                <a href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi! I want to schedule a visit to ${p.name} in ${p.area}, Bangalore`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all no-underline">
                  Schedule a Visit
                </a>
                <p className="text-[11px] text-center text-[#7a7167] mt-3">No brokerage · Free assistance</p>
              </div>

              {/* Quick info */}
              <div className="bg-[#f8f5f1] rounded-2xl border border-[#e8e2d8] p-4">
                <p className="text-xs font-semibold text-[#1a1208] mb-3">About this property</p>
                <p className="text-xs text-[#7a7167] leading-relaxed">{p.usp}</p>
                {p.actual_pg_name && (
                  <p className="text-xs text-[#b0a99f] mt-2">Operated by: {p.actual_pg_name}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related properties */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-[#1a1208] mb-5">More PGs in {p.area}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/property/${r.id}`} className="no-underline group">
                  <div className="bg-white rounded-xl border border-[#e8e2d8] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-3">
                      <Home size={18} className="text-brand" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1a1208] group-hover:text-brand transition-colors line-clamp-2 mb-1">{r.name}</h3>
                    <p className="text-xs text-[#7a7167] mb-2">{r.locality}</p>
                    <p className="text-sm font-bold text-[#1a1208]">₹{(r.min_rent/1000).toFixed(0)}K<span className="text-xs font-normal text-[#7a7167]">/mo</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
