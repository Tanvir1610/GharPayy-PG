import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  Search, ShieldCheck, Star, MapPin, Phone, ArrowRight,
  Wifi, Utensils, Wind, Zap, Shield, ChevronRight, Check,
  Users, Home, Sparkles, MessageCircle,
} from 'lucide-react';

const FEATURED_SLUGS = ['korvek','wysegirlk','koravillgirls','zeddluxecoed','homelygirls','nexcoedk'];
const BASE = 'https://gharpayy.com/xAssets/cards/koramangala';
const FEATURED = [
  { slug:'korvek',         name:'Korve Coed Koramangala',         gender:'Co-ed',      tier:'Basic Plus', rent:12000, rating:4.8, reviews:54, photo:`${BASE}/korvek/1.jpg`,         address:'1st Block, Koramangala' },
  { slug:'wysegirlk',      name:'Wyse Girls Koramangala',         gender:'Girls Only', tier:'Basic Plus', rent:12000, rating:4.8, reviews:63, photo:`${BASE}/wysegirlk/5.jpg`,       address:'Koramangala' },
  { slug:'koravillgirls',  name:'Koravill Girls Ejipura',         gender:'Girls Only', tier:'Basic Plus', rent:12000, rating:4.9, reviews:82, photo:`${BASE}/koravillgirls/1.jpg`,   address:'Ejipura, Koramangala' },
  { slug:'homelygirls',    name:'Homely Girls Koramangala',       gender:'Girls Only', tier:'Classics',   rent:17000, rating:4.9, reviews:78, photo:`${BASE}/homelygirls/1.png`,     address:'Koramangala' },
  { slug:'zeddluxecoed',   name:'ACE Flat Like Coed SG Palya',    gender:'Co-ed',      tier:'Basic Plus', rent:12000, rating:4.7, reviews:48, photo:`${BASE}/zeddluxecoed/1.jpeg`,   address:'SG Palya, Koramangala' },
  { slug:'nexcoedk',       name:'Nex Coed Koramangala',           gender:'Co-ed',      tier:'Basic Plus', rent:12000, rating:4.8, reviews:59, photo:`${BASE}/nexcoedk/1.jpg`,        address:'Koramangala' },
];

const AMENITIES = [
  { icon: Wifi,    label: 'High-Speed WiFi' },
  { icon: Utensils,label: 'Meals Included' },
  { icon: Wind,    label: 'AC Rooms' },
  { icon: Shield,  label: 'CCTV Security' },
  { icon: Zap,     label: 'Power Backup' },
  { icon: Sparkles,label: 'Housekeeping' },
];

const TESTIMONIALS = [
  { name:'Priya S.', role:'Software Engineer', text:'Found my perfect PG in Koramangala within a day. The verification process gave me full confidence. Highly recommend!', rating:5, city:'Bangalore' },
  { name:'Rahul M.', role:'MBA Student at Christ', text:'Moving to Bangalore was scary until I found GharPayy. Meals are amazing, WiFi is fast, and the team is super responsive.', rating:5, city:'Koramangala' },
  { name:'Sneha K.', role:'Product Manager', text:'Love the Classics tier — the co-working space and Netflix lounge are a game changer. Worth every rupee!', rating:5, city:'Bangalore' },
];

const STATS = [
  { value: '28+', label: 'Properties', icon: Home },
  { value: '1000+', label: 'Happy Tenants', icon: Users },
  { value: '4.8★', label: 'Avg Rating', icon: Star },
  { value: '100%', label: 'Verified', icon: ShieldCheck },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}
        className="relative overflow-hidden py-20 sm:py-28 px-4"
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,0.18) 0%, transparent 65%)' }} />

        {/* Floating property images background */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-4 -left-4 w-40 h-28 rounded-xl overflow-hidden rotate-[-6deg]">
            <img src={`${BASE}/korvek/2.jpg`} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-8 right-10 w-36 h-24 rounded-xl overflow-hidden rotate-[5deg]">
            <img src={`${BASE}/wysegirlk/2.jpg`} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-4 left-1/4 w-32 h-22 rounded-xl overflow-hidden rotate-[-3deg]">
            <img src={`${BASE}/koravillgirls/3.jpg`} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-8 right-1/4 w-36 h-24 rounded-xl overflow-hidden rotate-[4deg]">
            <img src={`${BASE}/homelygirls/1.png`} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-brand/30">
            <MapPin size={12} />Koramangala, Bangalore
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Find Your Perfect<br />
            <span className="text-brand">PG in Koramangala</span>
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            28+ verified PGs near Christ University, Forum Mall & Flipkart.
            Fully furnished · Meals included · Starting ₹12K/mo
          </p>

          {/* Search CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-8">
            <Link href="/search"
              className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl px-6 py-3.5 transition-colors no-underline">
              <Search size={16} />Browse All PGs
            </Link>
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-6 py-3.5 transition-colors no-underline">
              <Phone size={16} />WhatsApp Us
            </a>
          </div>

          {/* Quick gender filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: '♀ Girls PG', href: '/search?gender=female' },
              { label: '♂ Boys PG', href: '/search?gender=male' },
              { label: '⚧ Co-ed PG', href: '/search?gender=any' },
              { label: '🏆 Classics Tier', href: '/koramangala' },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="text-xs text-white/70 border border-white/20 hover:border-brand hover:text-brand px-3 py-1.5 rounded-full transition-all no-underline bg-white/5 hover:bg-brand/10">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────── */}
      <div className="bg-white border-b border-[#e8e2d8]">
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-2">
                <Icon size={18} className="text-brand" />
              </div>
              <p className="text-xl font-bold text-dark">{value}</p>
              <p className="text-xs text-[#7a7167] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROPERTIES ───────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Sparkles size={12} />Featured Properties
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark">
                Top PGs in Koramangala
              </h2>
              <p className="text-[#7a7167] text-sm mt-1">Hand-picked, verified & loved by tenants</p>
            </div>
            <Link href="/search"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark no-underline transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map(p => (
              <Link key={p.slug} href={`/property/static-koramangala-${p.slug}`} className="no-underline group">
                <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2d8] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-[#1a1208]">
                    <img src={p.photo} alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check size={8} />Verified
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.tier === 'Classics' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-dark/80 text-white'}`}>
                        {p.tier}
                      </span>
                    </div>

                    {/* Gender */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        p.gender === 'Girls Only' ? 'bg-pink-500 text-white' :
                        p.gender === 'Boys Only'  ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                      }`}>{p.gender}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-dark text-sm line-clamp-1 group-hover:text-brand transition-colors">{p.name}</h3>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-dark">{p.rating}</span>
                        <span className="text-[10px] text-[#b0a99f]">({p.reviews})</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#7a7167] flex items-center gap-1 mb-3">
                      <MapPin size={10} className="shrink-0" />{p.address}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-[#7a7167]">From</p>
                        <p className="text-base font-bold text-dark">₹{(p.rent/1000).toFixed(0)}K<span className="text-xs font-normal text-[#7a7167]">/mo</span></p>
                      </div>
                      <div className="flex gap-1.5">
                        <a href={`https://api.whatsapp.com/send?phone=918307396042&text=${encodeURIComponent(`Hi, I am interested in ${p.name}`)}`}
                          target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors no-underline">
                          <Phone size={11} />Chat
                        </a>
                        <span className="bg-brand hover:bg-brand-dark text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/search"
              className="inline-flex items-center gap-2 border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-7 py-3 rounded-xl transition-all no-underline text-sm">
              View All 28 Properties <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AMENITIES ─────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Check size={12} />Everything Included
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-2">
            All amenities, zero hassle
          </h2>
          <p className="text-[#7a7167] text-sm mb-10 max-w-lg mx-auto">
            Every GharPayy PG comes fully loaded — move in with just your bag.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-[#f8f5f1] hover:bg-brand/5 hover:border-brand border border-transparent transition-all cursor-default group">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                  <Icon size={20} className="text-brand" />
                </div>
                <span className="text-xs font-medium text-dark text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="py-16 px-4 bg-[#f8f5f1]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Sparkles size={12} />How It Works
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark">Move in within 48 hours</h2>
            <p className="text-[#7a7167] text-sm mt-2">From discovery to keys in your hand — it's that simple</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
            {[
              { icon: Search, step: '01', title: 'Browse & Filter', desc: 'Search by location, gender, budget and amenities. View real photos from every property.' },
              { icon: Phone, step: '02', title: 'WhatsApp Us', desc: 'Chat with our team instantly. Schedule a visit or get a virtual tour of your shortlist.' },
              { icon: Home, step: '03', title: 'Move In', desc: 'Complete easy paperwork and move in. No brokerage, no hidden charges.' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-[#e8e2d8] hover:shadow-md transition-shadow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mt-4 mb-4">
                  <Icon size={24} className="text-brand" />
                </div>
                <h3 className="font-bold text-dark mb-2">{title}</h3>
                <p className="text-sm text-[#7a7167] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR AREAS ─────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <MapPin size={12} />Popular Areas
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark">Find PGs near your workplace</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { area: 'Koramangala', sub: '28 PGs available', color: 'from-amber-500/20 to-orange-400/10' },
              { area: 'BTM Layout', sub: 'Coming soon', color: 'from-blue-500/10 to-indigo-400/10' },
              { area: 'HSR Layout', sub: 'Coming soon', color: 'from-purple-500/10 to-pink-400/10' },
              { area: 'Bellandur', sub: 'Coming soon', color: 'from-green-500/10 to-emerald-400/10' },
            ].map(({ area, sub, color }) => (
              <Link key={area} href={`/search?city=${area}`}
                className={`group relative p-5 rounded-2xl bg-gradient-to-br ${color} border border-[#e8e2d8] hover:border-brand hover:shadow-md transition-all no-underline`}>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={13} className="text-brand" />
                  <span className="font-bold text-dark text-sm group-hover:text-brand transition-colors">{area}</span>
                </div>
                <p className="text-[11px] text-[#7a7167] ml-5">{sub}</p>
                <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0a99f] group-hover:text-brand transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section className="py-16 px-4 bg-[#f8f5f1]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Star size={12} />Testimonials
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark">Loved by 1000+ tenants</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, text, rating, city }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-[#e8e2d8] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(rating)].map((_, i) => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-[#7a7167] leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-brand">{name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{name}</p>
                    <p className="text-xs text-[#7a7167]">{role} · {city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KORAMANGALA SPOTLIGHT ─────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#0a0806 0%,#2a1d0a 100%)' }}>
            <div className="absolute inset-0 opacity-15"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(200,129,58,0.6) 0%, transparent 70%)' }} />

            {/* Background photo strip */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-20 hidden lg:block">
              <div className="grid grid-cols-2 gap-1 h-full p-1">
                {[`${BASE}/korvek/1.jpg`,`${BASE}/wysegirlk/5.jpg`,`${BASE}/koravillgirls/1.jpg`,`${BASE}/homelygirls/1.png`].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-full h-full object-cover rounded" />
                ))}
              </div>
            </div>

            <div className="relative px-8 py-10 lg:w-3/5">
              <div className="inline-flex items-center gap-2 bg-brand/30 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-brand/40">
                <MapPin size={12} />Koramangala, Bangalore
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Bangalore&apos;s most loved<br />PG destination
              </h2>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Close to Christ University, Forum Mall, Flipkart HQ, Swiggy & Razorpay.
                28+ premium PGs in a single vibrant neighbourhood.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {['5 min to Christ University','3 min to Forum Mall','Co-ed & Girls options','₹12K–₹24K/mo'].map(t => (
                  <span key={t} className="text-xs bg-white/10 text-white/80 border border-white/20 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/koramangala"
                  className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors no-underline">
                  Explore Koramangala <ArrowRight size={14} />
                </Link>
                <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20am%20looking%20for%20a%20PG%20in%20Koramangala"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors no-underline">
                  <Phone size={14} />WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="py-16 px-4 bg-dark text-center">
        <div className="max-w-xl mx-auto">
          <MessageCircle size={36} className="text-green-400 mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to find your new home?
          </h2>
          <p className="text-white/50 text-sm mb-8">
            Our team is live on WhatsApp. Tell us your budget and location and we&apos;ll shortlist the best PGs for you — for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors no-underline">
              <Phone size={16} />+91 83073 96042
            </a>
            <Link href="/search"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-brand text-white hover:text-brand font-semibold px-8 py-3.5 rounded-xl transition-colors no-underline">
              <Search size={16} />Browse PGs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
