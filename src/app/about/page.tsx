import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { GALLERY_IMAGES, HERO_IMAGES } from '@/lib/images';
import { PROPERTY_STATS, ALL_AREAS } from '@/lib/allPropertiesData';
import {
  MapPin, Heart, Shield, Zap, Users, Star, Phone, ArrowRight,
  Target, Eye, Handshake, TrendingUp, Home, CheckCircle,
} from 'lucide-react';

export const metadata = {
  title: 'About GharPayy | Bangalore\'s Most Trusted PG Platform',
  description: 'GharPayy is Bangalore\'s most trusted PG platform. We help students and working professionals find verified, fully-furnished paying guest accommodations. 120+ PGs, 12+ areas, zero brokerage.',
};

const STATS = [
  { value: `${PROPERTY_STATS.total}+`, label: 'Verified PGs',      icon: Home },
  { value: '1,500+',                   label: 'Happy Tenants',     icon: Users },
  { value: `${ALL_AREAS.length}+`,     label: 'Areas in Bangalore',icon: MapPin },
  { value: '4.8★',                     label: 'Average Rating',    icon: Star },
  { value: '₹8K',                      label: 'Starting Rent',     icon: TrendingUp },
  { value: '48 hrs',                   label: 'Avg Move-in Time',  icon: Zap },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Trust First',
    description: 'Every PG on our platform is physically visited, photographed and verified by our team before it goes live. What you see is exactly what you get.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    description: 'Real photos. Real prices. No inflated "discounts". We show electricity billing clearly, meal timings accurately, and never hide the security deposit amount.',
  },
  {
    icon: Heart,
    title: 'Tenant-First Always',
    description: 'We charge property owners, not tenants. Our incentive is entirely aligned with you finding the right PG — not the most expensive one.',
  },
  {
    icon: Handshake,
    title: 'Long-term Relationships',
    description: 'We don\'t disappear after move-in. Our WhatsApp team is your point of contact for maintenance, disputes, renewals, and anything in-between throughout your stay.',
  },
];

const TEAM = [
  {
    name: 'Tanvir',
    role: 'Co-founder & Operations',
    bio: 'Lived the PG struggle first-hand when moving to Bangalore. Built GharPayy to be the platform he wished existed.',
    avatar: 'T',
    color: 'bg-brand/20 text-brand',
  },
  {
    name: 'GharPayy Team',
    role: 'Field & Verification Team',
    bio: 'Our boots-on-ground team visits every property, takes photos and vets each owner before any PG goes live.',
    avatar: 'GP',
    color: 'bg-green-100 text-green-700',
  },
  {
    name: 'Support Team',
    role: 'Tenant Relations',
    bio: 'Live on WhatsApp every day. Hundreds of tenants placed across Bangalore. Always a message away.',
    avatar: 'S',
    color: 'bg-purple-100 text-purple-700',
  },
];

const MILESTONES = [
  { year: '2023', label: 'Founded in Koramangala with a WhatsApp number and 5 PGs' },
  { year: '2024', label: 'Expanded to 50+ PGs across 6 areas. Crossed 500 happy tenants' },
  { year: '2025', label: 'Launched platform. 120+ verified PGs in 12+ areas of Bangalore' },
  { year: '2025', label: 'Zero-brokerage model fully operational. 1,500+ tenants placed' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />

      {/* ── HERO ─── */}
      <section
        style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 50%, #2a1d0a 100%)' }}
        className="relative overflow-hidden py-20 sm:py-28 px-4"
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,0.18) 0%, transparent 65%)' }} />

        {/* Scattered property images */}
        {HERO_IMAGES.map((src, i) => (
          <div key={i} className={`absolute rounded-2xl overflow-hidden pointer-events-none ${
            i === 0 ? 'top-4 left-4 w-40 h-28 opacity-15 -rotate-6' :
            i === 1 ? 'top-6 right-8 w-36 h-24 opacity-15 rotate-4' :
            i === 2 ? 'bottom-8 left-1/4 w-36 h-24 opacity-10 -rotate-3' :
                      'bottom-6 right-1/4 w-32 h-22 opacity-10 rotate-5'
          }`}>
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-brand/30">
            <Heart size={12} />Founded in Bangalore
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            We&apos;re on a mission to make<br />
            <span className="text-brand">PG-hunting stress-free</span>
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            GharPayy was born from the frustration of finding a decent PG in Bangalore.
            We built the platform we always wished existed — honest, simple, and completely free for tenants.
          </p>
        </div>
      </section>

      {/* ── STATS ─── */}
      <div className="bg-white border-b border-[#e8e2d8]">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-3 sm:grid-cols-6 gap-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-2">
                <Icon size={15} className="text-brand" />
              </div>
              <p className="text-lg font-bold text-[#1a1208]">{value}</p>
              <p className="text-[10px] text-[#7a7167] mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── STORY ─── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Target size={12} />Our Story
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-4">
                Born from personal frustration
              </h2>
              <div className="space-y-4 text-[#7a7167] leading-relaxed text-sm">
                <p>
                  Every year, thousands of students and professionals move to Bangalore chasing opportunities.
                  Their first challenge? Finding a decent place to live. The PG market was (and still is)
                  broken — fake photos, hidden charges, pushy brokers, and zero transparency.
                </p>
                <p>
                  GharPayy started as a simple WhatsApp number in Koramangala with 5 PGs. We would personally
                  visit each property, take honest photos, get the real price, and share it with anyone who asked.
                  Word spread quickly.
                </p>
                <p>
                  Today we have <strong className="text-[#1a1208]">{PROPERTY_STATS.total}+ verified PGs</strong> across{' '}
                  <strong className="text-[#1a1208]">{ALL_AREAS.length}+ areas</strong> in Bangalore, a full platform,
                  and a team dedicated to making sure every tenant finds their perfect home away from home.
                </p>
              </div>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-3">
              {GALLERY_IMAGES.koramangala.slice(0, 4).map((src, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden bg-[#1a1208] ${i === 0 ? 'row-span-2' : ''}`}>
                  <img src={src} alt="GharPayy property" className="w-full h-full object-cover" style={{ minHeight: i === 0 ? '280px' : '130px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="bg-[#0e0c0a] rounded-2xl p-7 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(200,129,58,0.6) 0%, transparent 70%)' }} />
            <Target size={24} className="text-brand mb-4 relative" />
            <h3 className="font-display text-xl font-bold text-white mb-3 relative">Our Mission</h3>
            <p className="text-white/60 text-sm leading-relaxed relative">
              To make finding a PG in Bangalore as simple, transparent and stress-free as booking a hotel —
              with zero brokerage, verified photos, and honest pricing for every tenant.
            </p>
          </div>
          <div className="bg-[#f8f5f1] rounded-2xl p-7 border border-[#e8e2d8]">
            <Eye size={24} className="text-brand mb-4" />
            <h3 className="font-display text-xl font-bold text-[#1a1208] mb-3">Our Vision</h3>
            <p className="text-[#7a7167] text-sm leading-relaxed">
              A world where every professional moving to a new city can find a verified, comfortable, affordable
              PG on day one — without broker fees, fake listings, or hidden surprises.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES ─── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-3">What we stand for</h2>
            <p className="text-[#7a7167] text-sm max-w-md mx-auto">The principles that drive every decision we make.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-[#e8e2d8] hover:shadow-md hover:border-brand/30 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <Icon size={20} className="text-brand" />
                </div>
                <h3 className="font-bold text-[#1a1208] mb-2">{title}</h3>
                <p className="text-sm text-[#7a7167] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-3">How far we&apos;ve come</h2>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-[#e8e2d8]" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-8 items-start relative">
                  <div className="w-16 shrink-0 text-right">
                    <span className="inline-block bg-brand text-white text-xs font-bold px-2 py-1 rounded-lg">{m.year}</span>
                  </div>
                  <div className="absolute left-[60px] top-2.5 w-3 h-3 rounded-full bg-brand border-2 border-white shadow-sm" />
                  <div className="flex-1 pt-0.5 pb-4">
                    <p className="text-sm text-[#1a1208] leading-relaxed">{m.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─── */}
      <section className="py-16 px-4 bg-[#f8f5f1]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-3">The people behind GharPayy</h2>
            <p className="text-[#7a7167] text-sm max-w-md mx-auto">Small team, big obsession with getting this right.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TEAM.map(({ name, role, bio, avatar, color }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-[#e8e2d8] text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4 text-xl font-bold font-display`}>
                  {avatar}
                </div>
                <h3 className="font-bold text-[#1a1208] mb-0.5">{name}</h3>
                <p className="text-xs text-brand font-semibold mb-3">{role}</p>
                <p className="text-xs text-[#7a7167] leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ─── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-xl font-bold text-[#1a1208] mb-5 text-center">Our properties speak for themselves</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {[...GALLERY_IMAGES.rooms, ...GALLERY_IMAGES.amenities].slice(0, 6).map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#1a1208]">
                <img src={src} alt={`GharPayy property ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-3">Why tenants choose GharPayy</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Zero brokerage — always free for tenants',
              `${PROPERTY_STATS.total}+ verified PGs in one place`,
              'Real photos — no stock images, no catfishing',
              'Live WhatsApp team — not a chatbot',
              'Transparent pricing — no hidden charges',
              'Post move-in support throughout your stay',
              '12+ areas covered across Bangalore',
              `${PROPERTY_STATS.girls} girls-only options available`,
              'Move in within 48 hours of choosing',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e8e2d8] text-sm">
                <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                <span className="text-[#1a1208]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #0a0806 0%, #2a1d0a 100%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <Handshake size={36} className="text-brand mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Let&apos;s find you a home
          </h2>
          <p className="text-white/50 text-sm mb-8">
            Browse our verified PGs or start a conversation with our team right now.
            No pressure, no brokerage — just honest help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/search"
              className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              Browse {PROPERTY_STATS.total}+ PGs <ArrowRight size={14} />
            </Link>
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20want%20to%20know%20more%20about%20your%20PGs"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              <Phone size={14} />+91 83073 96042
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
