import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { GALLERY_IMAGES } from '@/lib/images';
import {
  Search, MessageCircle, Home, CheckCircle, Shield, Star,
  MapPin, Phone, ArrowRight, Wifi, Utensils, Zap, Clock,
  Calendar, FileCheck, Key, ThumbsUp, Headphones,
} from 'lucide-react';

export const metadata = {
  title: 'How It Works | GharPayy — Find Your PG in 3 Simple Steps',
  description: 'Finding your perfect PG in Bangalore is simple with GharPayy. Browse 120+ verified PGs, WhatsApp our team, and move in within 48 hours. No brokerage. No hidden charges.',
};

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Browse & Filter',
    subtitle: 'Find PGs that match you',
    color: 'bg-brand/10 text-brand',
    accent: 'border-brand/30',
    description: 'Use our smart search to filter by area, gender, budget, food type and amenities. Every listing shows real photos, honest pricing and verified details — no surprises.',
    features: [
      'Filter by 12+ areas across Bangalore',
      'Girls-only, Boys-only and Co-ed options',
      'Budget, Mid-range and Premium tiers',
      'Real photos from every property',
    ],
    cta: { label: 'Browse All PGs', href: '/search' },
    image: GALLERY_IMAGES.koramangala[0],
  },
  {
    step: '02',
    icon: MessageCircle,
    title: 'WhatsApp Our Team',
    subtitle: 'Get personalised help — free',
    color: 'bg-green-100 text-green-700',
    accent: 'border-green-300',
    description: 'Our team is live on WhatsApp every day. Tell us your budget, preferred area and move-in date. We shortlist the best-matched PGs, arrange virtual tours, and answer every question.',
    features: [
      'Live WhatsApp support — no bots',
      'Free shortlisting & recommendations',
      'Virtual tour videos on request',
      'Schedule in-person visits',
    ],
    cta: { label: 'Chat on WhatsApp', href: 'https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG', external: true },
    image: GALLERY_IMAGES.rooms[0],
  },
  {
    step: '03',
    icon: Key,
    title: 'Move In',
    subtitle: 'Keys in hand within 48 hours',
    color: 'bg-amber-100 text-amber-700',
    accent: 'border-amber-300',
    description: 'Once you pick your PG, our team handles all the paperwork. Simple agreement, one month refundable deposit, and you\'re in. No brokerage fees. No hidden charges. Ever.',
    features: [
      'Zero brokerage — we charge the owner',
      'Simple 1-page agreement',
      'One month refundable deposit',
      'Move-in support on day one',
    ],
    cta: { label: 'View Available PGs', href: '/search' },
    image: GALLERY_IMAGES.amenities[0],
  },
];

const FAQS = [
  {
    q: 'Is GharPayy free for tenants?',
    a: 'Yes, 100%. GharPayy is completely free for anyone looking for a PG. We charge a small fee to property owners when a tenant moves in — you never pay us anything.',
  },
  {
    q: 'How quickly can I move in?',
    a: 'Most tenants move in within 24–48 hours of confirming their PG. We handle the paperwork fast, and most properties are available immediately.',
  },
  {
    q: 'Are the photos and prices real?',
    a: 'Yes. Every photo on GharPayy is taken at the actual property. Prices shown are the real monthly rent — nothing is hidden. Electricity is included unless clearly stated otherwise.',
  },
  {
    q: 'What does the security deposit cover?',
    a: 'The deposit is one month\'s rent, fully refundable when you vacate (subject to no damage). It\'s held by the property owner, not GharPayy.',
  },
  {
    q: 'Can I visit the PG before committing?',
    a: 'Absolutely. Tell our WhatsApp team which properties you\'re interested in and we\'ll schedule in-person visits or send you a fresh video walkthrough.',
  },
  {
    q: 'What if I have a problem after moving in?',
    a: 'Our team remains your point of contact throughout your stay. WhatsApp us any time for maintenance issues, disputes, or if you need to switch PGs.',
  },
  {
    q: 'What is included in the rent?',
    a: 'All GharPayy PGs include WiFi, meals (2–4/day), housekeeping, power backup and water. Electricity is included at most properties — we clearly label the ones where it is billed separately.',
  },
  {
    q: 'Do you have PGs for working professionals?',
    a: 'Yes — the majority of our properties specifically cater to working professionals near tech parks in Koramangala, Bellandur, Whitefield, Marathahalli, Mahadevapura and HSR Layout.',
  },
];

const TRUST_BADGES = [
  { icon: Shield,     label: '100% Verified',       desc: 'Every PG is physically inspected' },
  { icon: Star,       label: '4.8★ Average Rating',  desc: 'Based on 1,500+ tenant reviews' },
  { icon: ThumbsUp,   label: 'Zero Brokerage',       desc: 'You never pay us a rupee' },
  { icon: Headphones, label: 'Live Support',          desc: 'WhatsApp team on all days' },
  { icon: Clock,      label: '48-Hour Move-in',      desc: 'From search to keys in 2 days' },
  { icon: FileCheck,  label: 'Simple Agreement',     desc: '1-page, no legal jargon' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />

      {/* ── HERO ─── */}
      <section
        style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 50%, #2a1d0a 100%)' }}
        className="relative overflow-hidden py-20 sm:py-28 px-4"
      >
        {/* floating images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {GALLERY_IMAGES.koramangala.slice(0, 4).map((src, i) => (
            <div key={i} className={`absolute rounded-2xl overflow-hidden opacity-15 ${
              i === 0 ? 'top-4 left-4 w-44 h-32 -rotate-6' :
              i === 1 ? 'top-6 right-8 w-36 h-28 rotate-4' :
              i === 2 ? 'bottom-6 left-1/4 w-40 h-28 -rotate-3' :
                        'bottom-8 right-1/4 w-36 h-24 rotate-5'
            }`}>
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,0.18) 0%, transparent 65%)' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-brand/30">
            <CheckCircle size={12} />Simple · Fast · Free
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Find Your PG in<br />
            <span className="text-brand">3 Simple Steps</span>
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Browse 120+ verified PGs, chat with our team on WhatsApp, and move in within 48 hours.
            Zero brokerage. Zero hidden charges.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/search"
              className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              <Search size={15} />Browse PGs Now
            </Link>
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              <Phone size={15} />WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ─── */}
      <div className="bg-white border-b border-[#e8e2d8]">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_BADGES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-2">
                <Icon size={17} className="text-brand" />
              </div>
              <p className="text-xs font-bold text-[#1a1208]">{label}</p>
              <p className="text-[10px] text-[#7a7167] mt-0.5 leading-tight">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── STEPS ─── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1208] mb-3">
              Here&apos;s exactly how it works
            </h2>
            <p className="text-[#7a7167] max-w-lg mx-auto">
              From your first search to carrying your bags inside — we&apos;ve made every step smooth, transparent and free.
            </p>
          </div>

          <div className="space-y-24">
            {STEPS.map((s, i) => (
              <div key={s.step}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`relative rounded-3xl overflow-hidden shadow-xl ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Step badge */}
                  <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-[#0e0c0a]/80 backdrop-blur-sm flex flex-col items-center justify-center border border-white/20">
                    <span className="text-[10px] text-white/50 font-medium">STEP</span>
                    <span className="text-xl font-bold text-brand leading-none">{s.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className={`inline-flex items-center gap-2 ${s.color} text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border ${s.accent}`}>
                    <s.icon size={13} />{s.subtitle}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-4">{s.title}</h3>
                  <p className="text-[#7a7167] leading-relaxed mb-6">{s.description}</p>
                  <ul className="space-y-2.5 mb-7">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[#1a1208]">
                        <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {s.cta.external ? (
                    <a href={s.cta.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors no-underline">
                      {s.cta.label} <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Link href={s.cta.href}
                      className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors no-underline">
                      {s.cta.label} <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-3">
              Everything included in your rent
            </h2>
            <p className="text-[#7a7167] text-sm max-w-md mx-auto">
              No surprise bills. No add-ons. One flat monthly rent covers all of this:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Wifi,        label: 'High-Speed WiFi',    desc: 'Unlimited broadband, always on' },
              { icon: Utensils,    label: '2–4 Meals Daily',    desc: 'Breakfast, lunch, snacks & dinner' },
              { icon: Zap,         label: 'Power Backup',        desc: 'Inverter for uninterrupted supply' },
              { icon: Home,        label: 'Housekeeping',        desc: 'Room & common area cleaning' },
              { icon: Shield,      label: 'CCTV & Security',    desc: 'Guards + biometric access' },
              { icon: Calendar,    label: 'Maintenance',         desc: 'Repairs & upkeep handled for you' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f8f5f1] border border-[#e8e2d8] hover:border-brand hover:bg-brand/5 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:shadow-md transition-shadow">
                  <Icon size={18} className="text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1208] text-sm">{label}</p>
                  <p className="text-xs text-[#7a7167] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY STRIP ─── */}
      <section className="py-12 px-4 bg-[#f8f5f1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-[#1a1208] mb-6 text-center">
            Real rooms. Real photos.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {GALLERY_IMAGES.koramangala.slice(0, 6).map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#1a1208]">
                <img src={src} alt={`GharPayy PG room ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
            {GALLERY_IMAGES.koramangala.slice(6, 12).map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#1a1208]">
                <img src={src} alt={`GharPayy PG room ${i + 7}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] mb-3">
              Frequently asked questions
            </h2>
            <p className="text-[#7a7167] text-sm">Still have questions? WhatsApp us — we reply within minutes.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-[#f8f5f1] rounded-2xl border border-[#e8e2d8] overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-[#1a1208] text-sm hover:text-brand transition-colors">
                  {q}
                  <span className="text-brand text-lg shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-[#7a7167] leading-relaxed border-t border-[#e8e2d8] pt-3">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #0a0806 0%, #2a1d0a 100%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <MapPin size={36} className="text-brand mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to find your perfect PG?
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Join 1,500+ happy tenants across Bangalore. Our team on WhatsApp helps you move in — for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/search"
              className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              <Search size={15} />Browse 120+ PGs
            </Link>
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors no-underline">
              <Phone size={15} />WhatsApp — +91 83073 96042
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
