import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { PGProperty } from '@/lib/allPropertiesData';
import { MapPin, Star, Phone, Check, ArrowRight } from 'lucide-react';

function PGCard({ p }: { p: PGProperty }) {
  const gc = p.gender_preference === 'female' ? 'bg-pink-500' : p.gender_preference === 'male' ? 'bg-blue-500' : 'bg-purple-500';
  const gl = p.gender_preference === 'female' ? 'Girls Only' : p.gender_preference === 'male' ? 'Boys Only' : 'Co-ed';
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <div className="relative h-40 bg-gradient-to-br from-[#1a1208] to-[#2a1d0a] flex items-center justify-center">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,129,58,0.6) 0%, transparent 70%)' }} />
        <div className="relative text-center">
          <div className="text-4xl mb-1">🏠</div>
          <p className="text-white/60 text-xs">{p.locality}</p>
        </div>
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check size={8} />Verified
          </span>
        </div>
        <span className={`absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white ${gc}`}>{gl}</span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-[#1a1208] text-sm line-clamp-2 group-hover:text-brand transition-colors leading-tight">{p.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold">{p.average_rating}</span>
          </div>
        </div>
        <p className="text-[11px] text-[#7a7167] flex items-center gap-1 mb-2">
          <MapPin size={10} />{p.locality}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {p.highlights.slice(0, 2).map(h => (
            <span key={h} className="text-[10px] bg-[#f8f5f1] text-[#7a7167] px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm font-bold text-[#1a1208]">₹{(p.min_rent/1000).toFixed(0)}K<span className="text-xs font-normal text-[#7a7167]">/mo</span></p>
          <div className="flex gap-1.5">
            <a href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi! I'm interested in ${p.name}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[10px] font-semibold px-2 py-1.5 rounded-lg transition-colors no-underline">
              <Phone size={10} />Chat
            </a>
            <Link href={`/property/${p.id}`}
              className="bg-brand hover:bg-brand-dark text-white text-[10px] font-semibold px-2 py-1.5 rounded-lg transition-colors no-underline">
              View →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AreaPageProps {
  area: string;
  title: string;
  description: string;
  properties: PGProperty[];
  landmarks: string[];
  offices: string[];
}

export default function AreaPage({ area, title, description, properties, landmarks, offices }: AreaPageProps) {
  const girls = properties.filter(p => p.gender_preference === 'female');
  const boys  = properties.filter(p => p.gender_preference === 'male');
  const coed  = properties.filter(p => p.gender_preference === 'any');

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(140deg,#0a0806 0%,#1a1208 50%,#2a1d0a 100%)' }}
        className="relative overflow-hidden py-14 sm:py-20 px-4">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,.18) 0%,transparent 65%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-brand/30">
            <MapPin size={12} />{area}, Bangalore
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">{title}</h1>
          <p className="text-white/60 text-sm sm:text-base mb-6 max-w-xl mx-auto">{description}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {girls.length > 0 && <span className="text-xs bg-pink-500 text-white px-3 py-1.5 rounded-full font-semibold">♀ {girls.length} Girls PGs</span>}
            {boys.length > 0 && <span className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-full font-semibold">♂ {boys.length} Boys PGs</span>}
            {coed.length > 0 && <span className="text-xs bg-purple-500 text-white px-3 py-1.5 rounded-full font-semibold">⚧ {coed.length} Co-ed PGs</span>}
          </div>
          <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20am%20looking%20for%20a%20PG"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors no-underline">
            <Phone size={14} />Free WhatsApp Assistance
          </a>
        </div>
      </section>

      {/* Landmarks + Offices */}
      {(landmarks.length > 0 || offices.length > 0) && (
        <div className="bg-white border-b border-[#e8e2d8] px-4 py-5">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
            {landmarks.map(l => (
              <span key={l} className="flex items-center gap-1.5 text-xs bg-[#f8f5f1] text-[#7a7167] px-3 py-1.5 rounded-full border border-[#e8e2d8]">
                <MapPin size={10} className="text-brand" />{l}
              </span>
            ))}
            {offices.map(o => (
              <span key={o} className="flex items-center gap-1.5 text-xs bg-brand/10 text-brand px-3 py-1.5 rounded-full border border-brand/20 font-medium">
                🏢 {o}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* All properties */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1a1208]">All PGs in {area}</h2>
              <p className="text-[#7a7167] text-sm mt-1">{properties.length} verified properties</p>
            </div>
            <Link href="/search" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark no-underline">
              All areas <ArrowRight size={13} />
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#e8e2d8]">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="font-bold text-[#1a1208] mb-2">Coming Soon!</h3>
              <p className="text-[#7a7167] text-sm mb-5">We&apos;re adding PGs in {area} soon. WhatsApp us for early access.</p>
              <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20a%20PG%20in%20{area}"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm no-underline">
                <Phone size={14} />Notify Me
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {properties.map(p => <PGCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4" style={{ background: 'linear-gradient(135deg,#0a0806 0%,#2a1d0a 100%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">Need help choosing the right PG?</h2>
          <p className="text-white/50 text-sm mb-6">Our team on WhatsApp shortlists the best options for your budget — free of charge.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20a%20PG%20in%20{area}"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3 rounded-xl text-sm no-underline">
              <Phone size={14} />+91 83073 96042
            </a>
            <Link href="/search"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-brand text-white hover:text-brand font-semibold px-7 py-3 rounded-xl text-sm transition-colors no-underline">
              Browse All Areas <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
