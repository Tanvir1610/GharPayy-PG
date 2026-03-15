'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Star, Users, Wifi, ShieldCheck, Utensils, BedDouble,
  Dumbbell, Sparkles, Phone, MessageSquare, Check, ChevronDown,
  ChevronUp, Home, Zap, Droplets, Wind,
} from 'lucide-react';

interface Room { id: string; roomType: string; totalBeds: number; occupiedBeds: number; rent: number; amenities: string[] }
interface PropertyData {
  id: string; name: string; address: string; city: string; description: string;
  genderPreference: string; amenities: string[]; rules: string; photos: string[];
  isVerified: boolean; averageRating: number; totalReviews: number;
  highlights: string[]; owner: { fullName: string; email: string; phone: string };
}

interface Props { property: PropertyData; rooms: Room[] }

const AMENITY_ICONS: Record<string, React.ElementType> = {
  'Free Breakfast': Utensils, 'Home-cooked Meals': Utensils, 'High-Speed WiFi': Wifi,
  'AC Rooms': Wind, 'CCTV Security': ShieldCheck, 'Biometric Access': ShieldCheck,
  '24×7 Security': ShieldCheck, 'Housekeeping': Sparkles, 'Washing Machine': Droplets,
  'Power Backup': Zap, 'Gym': Dumbbell, 'Gaming Zone': Sparkles,
  'Co-working Space': Home, 'Attached Bathroom': Droplets, 'Wardrobe': BedDouble, 'Water Purifier': Droplets,
};

const TIER_STYLES: Record<string, { bg: string; border: string; badge: string; badgeText: string }> = {
  Advantage:  { bg: 'bg-gray-50',        border: 'border-gray-200',  badge: 'bg-gray-100',         badgeText: 'text-gray-600' },
  'Basic Plus':{ bg: 'bg-blue-50',       border: 'border-blue-200',  badge: 'bg-blue-100',         badgeText: 'text-blue-700' },
  Classics:   { bg: 'bg-brand/5',        border: 'border-brand/30',  badge: 'bg-brand/10',         badgeText: 'text-brand' },
  'Luxe Max': { bg: 'bg-[#1a1208]',      border: 'border-[#c8813a]', badge: 'bg-[#c8813a]',        badgeText: 'text-white' },
};

const TIER_LABELS: Record<number, string> = { 9000: 'Advantage', 14500: 'Basic Plus', 21000: 'Classics', 35000: 'Luxe Max' };
const TIER_RANGE: Record<string, string> = { Advantage: '₹7K–11K/mo', 'Basic Plus': '₹12K–17K/mo', Classics: '₹17K–26K/mo', 'Luxe Max': '₹25K–45K/mo' };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={14} className={s <= Math.round(rating) ? 'fill-brand text-brand' : 'fill-[#e8e2d8] text-[#e8e2d8]'} />
      ))}
    </div>
  );
}

export default function PropertyInfo({ property, rooms }: Props) {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [activeRoom, setActiveRoom] = useState(rooms[0]?.id || '');

  const displayAmenities = showAllAmenities ? property.amenities : property.amenities.slice(0, 8);
  const minRent = rooms.length ? Math.min(...rooms.map(r => r.rent)) : 0;
  const selectedRoom = rooms.find(r => r.id === activeRoom);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="grid lg:grid-cols-3 gap-8">

        {/* ── LEFT: Main content ───────────────────────── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="font-display text-3xl font-bold text-dark leading-tight">{property.name}</h1>
                <p className="flex items-center gap-1.5 text-[#7a7167] mt-2 text-sm">
                  <MapPin size={14} className="text-brand shrink-0" />
                  {property.address}, {property.city}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#7a7167] mb-0.5">Starting from</p>
                <p className="font-display text-2xl font-bold text-dark">
                  ₹{minRent > 0 ? minRent.toLocaleString() : '7,000'}
                  <span className="text-sm font-normal text-[#7a7167]">/mo</span>
                </p>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <StarRating rating={property.averageRating} />
                <span className="font-semibold text-dark text-sm">{property.averageRating.toFixed(1)}</span>
                <span className="text-[#7a7167] text-sm">({property.totalReviews} reviews)</span>
              </div>
              <span className="w-px h-4 bg-[#e8e2d8]" />
              <span className="flex items-center gap-1.5 text-sm text-[#7a7167] capitalize">
                <Users size={14} />
                {property.genderPreference === 'any' ? 'Co-ed (All genders)' : `${property.genderPreference} only`}
              </span>
              {property.isVerified && (
                <>
                  <span className="w-px h-4 bg-[#e8e2d8]" />
                  <span className="flex items-center gap-1.5 text-sm text-green-700 font-medium">
                    <ShieldCheck size={14} className="text-green-600" /> Verified Property
                  </span>
                </>
              )}
            </div>

            {/* Highlights */}
            {property.highlights?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {property.highlights.map(h => (
                  <span key={h} className="flex items-center gap-1.5 text-xs font-medium bg-[#f8f5f1] border border-[#e8e2d8] text-dark px-3 py-1.5 rounded-full">
                    <Check size={11} className="text-brand" /> {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          {property.description && (
            <section>
              <h2 className="font-display text-xl font-bold text-dark mb-3">About this PG</h2>
              <p className="text-[#7a7167] leading-relaxed text-sm">{property.description}</p>
            </section>
          )}

          {/* Pricing Tiers */}
          {rooms.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-dark mb-4">Choose Your Room</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {rooms.map(room => {
                  const tierName = TIER_LABELS[room.rent] || room.roomType;
                  const style = TIER_STYLES[tierName] || TIER_STYLES['Advantage'];
                  const available = room.totalBeds - room.occupiedBeds;
                  const isActive = room.id === activeRoom;

                  return (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoom(room.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${style.bg} ${isActive ? style.border + ' shadow-md scale-[1.02]' : 'border-transparent hover:border-[#e8e2d8]'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge} ${style.badgeText}`}>{tierName}</span>
                        {available > 0
                          ? <span className="text-xs text-green-600 font-medium">{available} bed{available > 1 ? 's' : ''} left</span>
                          : <span className="text-xs text-red-500 font-medium">Full</span>
                        }
                      </div>
                      <p className={`font-display text-xl font-bold ${tierName === 'Luxe Max' ? 'text-white' : 'text-dark'}`}>
                        {TIER_RANGE[tierName] || `₹${room.rent.toLocaleString()}/mo`}
                      </p>
                      <p className={`text-xs mt-0.5 capitalize ${tierName === 'Luxe Max' ? 'text-white/60' : 'text-[#7a7167]'}`}>
                        {room.roomType} occupancy
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected room amenities */}
              {selectedRoom && (
                <div className="bg-[#f8f5f1] rounded-2xl p-4">
                  <p className="text-xs font-semibold text-[#7a7167] uppercase tracking-wide mb-2">Included in {TIER_LABELS[selectedRoom.rent] || selectedRoom.roomType}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.amenities.map(a => (
                      <span key={a} className="flex items-center gap-1 text-xs bg-white text-dark px-2.5 py-1 rounded-full border border-[#e8e2d8]">
                        <Check size={10} className="text-brand" /> {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-dark mb-4">What's Included</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {displayAmenities.map(a => {
                  const Icon = AMENITY_ICONS[a] || Home;
                  return (
                    <div key={a} className="flex flex-col items-center gap-2 p-4 bg-[#f8f5f1] rounded-2xl hover:bg-[#f0ebe3] transition-colors text-center">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <Icon size={18} className="text-brand" />
                      </div>
                      <span className="text-xs font-medium text-dark leading-tight">{a}</span>
                    </div>
                  );
                })}
              </div>
              {property.amenities.length > 8 && (
                <button
                  onClick={() => setShowAllAmenities(v => !v)}
                  className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-light transition-colors"
                >
                  {showAllAmenities ? <><ChevronUp size={16} /> Show less</> : <><ChevronDown size={16} /> Show all {property.amenities.length} amenities</>}
                </button>
              )}
            </section>
          )}

          {/* House Rules */}
          {property.rules && (
            <section>
              <h2 className="font-display text-xl font-bold text-dark mb-3">House Rules</h2>
              <div className="bg-[#f8f5f1] rounded-2xl p-5">
                {property.rules.split('\n').map((rule, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm text-[#7a7167] mb-2 last:mb-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                    {rule}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── RIGHT: Sticky contact card ───────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">

            {/* Book card */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] shadow-lg p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-[#7a7167]">Starting from</p>
                <div className="flex items-center gap-1">
                  <StarRating rating={property.averageRating} />
                  <span className="text-xs text-[#7a7167] ml-1">{property.averageRating.toFixed(1)}</span>
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-dark mb-4">
                ₹{minRent > 0 ? minRent.toLocaleString() : '7,000'}
                <span className="text-sm font-normal text-[#7a7167]">/mo</span>
              </p>

              <a
                href={`https://wa.me/917988114576?text=Hi! I'm interested in ${property.name}, ${property.city}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold py-3 rounded-xl transition-colors no-underline mb-3 flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.546 4.07 1.5 5.789L0 24l6.344-1.487A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.513-5.17-1.4l-.37-.22-3.768.883.899-3.678-.242-.38A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp Now
              </a>

              <Link
                href="/login"
                className="block w-full text-center border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold py-3 rounded-xl transition-colors no-underline"
              >
                Book a Visit
              </Link>

              <p className="text-center text-xs text-[#7a7167] mt-3">No booking fee · Verified listing</p>
            </div>

            {/* Owner card */}
            <div className="bg-white rounded-2xl border border-[#e8e2d8] p-5">
              <h3 className="font-semibold text-dark mb-3 text-sm">Hosted by</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-brand">{property.owner.fullName[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">{property.owner.fullName}</p>
                  <p className="text-xs text-[#7a7167]">{property.city}, India</p>
                </div>
              </div>
              <div className="space-y-2">
                {property.owner.phone && (
                  <a href={`tel:${property.owner.phone}`}
                    className="flex items-center gap-2 text-sm text-[#7a7167] hover:text-brand transition-colors no-underline">
                    <Phone size={14} className="text-brand" /> {property.owner.phone}
                  </a>
                )}
                <a href={`mailto:${property.owner.email}`}
                  className="flex items-center gap-2 text-sm text-[#7a7167] hover:text-brand transition-colors no-underline">
                  <MessageSquare size={14} className="text-brand" /> {property.owner.email}
                </a>
              </div>
            </div>

            {/* Safety note */}
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
              <ShieldCheck size={18} className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800">Verified & Safe</p>
                <p className="text-xs text-green-700 mt-0.5 leading-relaxed">This property has been personally inspected and verified by the GharPayy team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
