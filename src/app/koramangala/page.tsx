import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { KORAMANGALA_PROPERTIES } from '@/lib/koramangalaData';
import { MapPin, Star, Phone, Check, Sparkles, ArrowRight, Wifi, Utensils, Shield, Zap, Users, Home } from 'lucide-react';

export const metadata = {
  title: 'PG in Koramangala Bangalore | GharPayy — 30+ Verified PGs',
  description: 'Best PGs in Koramangala Bangalore. Near Christ University, Nexus Mall, Dairy Circle. Girls, Boys & Co-ed PGs. Meals included. Starting ₹9K/mo. No brokerage.',
};

const LANDMARKS = [
  { name: 'Christ University', distance: '2 min walk' },
  { name: 'Nexus Mall', distance: '5 min walk' },
  { name: 'Dairy Circle', distance: '7 min walk' },
  { name: 'Koramangala 5th/6th Block', distance: '10 min' },
  { name: 'IBC Knowledge Park', distance: '8 min' },
  { name: 'Silk Board', distance: '10 min' },
];

export default function KoramangalaPage() {
  const props = KORAMANGALA_PROPERTIES;
  const girls = props.filter(p => p.gender_preference === 'female');
  const boys  = props.filter(p => p.gender_preference === 'male');
  const coed  = props.filter(p => p.gender_preference === 'any');

  function PGCard({ p }: { p: typeof props[0] }) {
    const gc = p.gender_preference === 'female' ? 'bg-pink-500' : p.gender_preference === 'male' ? 'bg-blue-500' : 'bg-purple-500';
    const gl = p.gender_preference === 'female' ? 'Girls Only' : p.gender_preference === 'male' ? 'Boys Only' : 'Co-ed';
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
        <div className="relative h-44 bg-gradient-to-br from-[#1a1208] to-[#2a1d0a] flex items-center justify-center">
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,129,58,0.6) 0%, transparent 70%)' }} />
          <div className="relative text-center">
            <div className="text-4xl mb-1">🏠</div>
            <p className="text-white/70 text-xs">{p.locality}</p>
          </div>
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check size={8} />Verified
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.tier === 'Classics' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-white/20 text-white'}`}>
              {p.tier}
            </span>
          </div>
          <span className={`absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${gc}`}>{gl}</span>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-[#1a1208] text-sm line-clamp-2 group-hover:text-brand transition-colors leading-tight">{p.name}</h3>
            <div className="flex items-center gap-0.5 shrink-0">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-[#1a1208]">{p.average_rating}</span>
            </div>
          </div>
          <p className="text-[11px] text-[#7a7167] flex items-center gap-1 mb-3">
            <MapPin size={10} />{p.locality || 'Koramangala'}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {p.highlights.slice(0, 3).map(h => (
              <span key={h} className="text-[10px] bg-[#f8f5f1] text-[#7a7167] px-2 py-0.5 rounded-full">{h}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#7a7167]">From</p>
              <p className="text-base font-bold text-[#1a1208]">₹{(p.min_rent/1000).toFixed(0)}K<span className="text-xs font-normal text-[#7a7167]">/mo</span></p>
            </div>
            <div className="flex gap-1.5">
              <a href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi GharPayy! I'm interested in ${p.name}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors no-underline">
                <Phone size={11} />Chat
              </a>
              <a href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi! I want details about ${p.name} in Koramangala`)}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-brand hover:bg-brand-dark text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors no-underline">
                Enquire →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(140deg,#0a0806 0%,#1a1208 50%,#2a1d0a 100%)' }}
        className="relative overflow-hidden py-16 sm:py-24 px-4">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(200,129,58,.18) 0%,transparent 65%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-brand/30">
            <MapPin size={12} />Koramangala, Bangalore
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Best PGs in<br /><span className="text-brand">Koramangala</span>
          </h1>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
            {props.length}+ verified PGs near Christ University, Nexus Mall & Dairy Circle.
            Girls, Boys & Co-ed options. Fully furnished · Meals included · Starting ₹9K/mo.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <a href="#girls" className="text-xs bg-pink-500 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-pink-600 transition-colors no-underline">
              ♀ {girls.length} Girls PGs
            </a>
            <a href="#boys" className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-blue-600 transition-colors no-underline">
              ♂ {boys.length} Boys PGs
            </a>
            <a href="#coed" className="text-xs bg-purple-500 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-purple-600 transition-colors no-underline">
              ⚧ {coed.length} Co-ed PGs
            </a>
          </div>
          <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20am%20looking%20for%20a%20PG%20in%20Koramangala"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
            <Phone size={15} />WhatsApp for Free Assistance
          </a>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-[#e8e2d8]">
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { icon: Home, val: `${props.length}+`, label: 'PGs in Koramangala' },
            { icon: Users, val: '500+', label: 'Happy Tenants' },
            { icon: Star, val: '4.8★', label: 'Avg Rating' },
            { icon: Check, val: '100%', label: 'Verified' },
          ].map(({ icon: Icon, val, label }) => (
            <div key={label}>
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-2">
                <Icon size={18} className="text-brand" />
              </div>
              <p className="text-xl font-bold text-[#1a1208]">{val}</p>
              <p className="text-xs text-[#7a7167] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Landmarks */}
      <section className="py-10 px-4 bg-[#f8f5f1]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-xl font-bold text-[#1a1208] mb-4 text-center">Nearby Landmarks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LANDMARKS.map(l => (
              <div key={l.name} className="bg-white rounded-xl p-3 text-center border border-[#e8e2d8]">
                <MapPin size={16} className="text-brand mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-[#1a1208]">{l.name}</p>
                <p className="text-[10px] text-[#7a7167] mt-0.5">{l.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Girls PGs */}
      {girls.length > 0 && (
        <section id="girls" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  ♀ Girls Only
                </div>
                <h2 className="font-display text-2xl font-bold text-[#1a1208]">Girls PGs in Koramangala</h2>
                <p className="text-[#7a7167] text-sm mt-1">{girls.length} verified properties</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {girls.map(p => <PGCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Boys PGs */}
      {boys.length > 0 && (
        <section id="boys" className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  ♂ Boys Only
                </div>
                <h2 className="font-display text-2xl font-bold text-[#1a1208]">Boys PGs in Koramangala</h2>
                <p className="text-[#7a7167] text-sm mt-1">{boys.length} verified properties</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {boys.map(p => <PGCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Co-ed PGs */}
      {coed.length > 0 && (
        <section id="coed" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  ⚧ Co-ed / Coliving
                </div>
                <h2 className="font-display text-2xl font-bold text-[#1a1208]">Co-ed PGs in Koramangala</h2>
                <p className="text-[#7a7167] text-sm mt-1">{coed.length} verified properties</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {coed.map(p => <PGCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Sparkles size={12} />Everything Included
          </div>
          <h2 className="font-display text-2xl font-bold text-[#1a1208] mb-8">Standard amenities at every GharPayy PG</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Wifi, label: 'High-Speed WiFi' },
              { icon: Utensils, label: 'Meals Included' },
              { icon: Shield, label: 'CCTV Security' },
              { icon: Zap, label: 'Power Backup' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#f8f5f1] border border-[#e8e2d8] hover:border-brand transition-all">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Icon size={22} className="text-brand" />
                </div>
                <span className="text-sm font-medium text-[#1a1208]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4" style={{ background: 'linear-gradient(135deg,#0a0806 0%,#2a1d0a 100%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Can't decide? Let us help.
          </h2>
          <p className="text-white/50 text-sm mb-7">
            Tell us your budget and requirements. Our team shortlists the best PGs for you — free of charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20am%20looking%20for%20a%20PG%20in%20Koramangala"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              <Phone size={15} />+91 83073 96042
            </a>
            <Link href="/search"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-brand text-white hover:text-brand font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              Browse All Areas <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
