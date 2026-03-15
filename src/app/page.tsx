import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Search, ShieldCheck, Star, MapPin } from 'lucide-react';

export default function HomePage() {
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

  const steps = [
    { icon: Search, title: 'Search', desc: 'Browse thousands of verified PGs in your city.' },
    { icon: MapPin, title: 'Visit', desc: 'Schedule a visit to inspect your shortlisted rooms.' },
    { icon: ShieldCheck, title: 'Book', desc: 'Book securely with transparent pricing.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}
        className="relative overflow-hidden py-24 px-4"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,129,58,0.15) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Find Your Perfect<br />
            <span className="text-brand">PG & Rental Room</span>
          </h1>
          <p className="text-white/70 text-lg mb-10">
            Verified accommodations across India — browse, schedule visits and book in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Link
              href="/search"
              className="flex-1 bg-brand hover:bg-brand-light text-white font-semibold rounded-lg px-6 py-3 text-center transition-colors no-underline"
            >
              Search PGs
            </Link>
            <Link
              href="/signup"
              className="flex-1 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg px-6 py-3 text-center transition-colors no-underline"
            >
              List Your PG
            </Link>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center text-dark mb-8">Popular Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/search?city=${city}`}
                className="flex items-center justify-center gap-2 p-4 rounded-xl border border-[#e8e2d8] hover:border-brand hover:bg-brand/5 transition-all no-underline text-dark font-medium text-sm"
              >
                <MapPin size={14} className="text-brand" />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-[#f8f5f1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-dark mb-10">How GharPayy Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center relative">
                  <s.icon size={24} className="text-brand" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-dark">{s.title}</h3>
                <p className="text-sm text-[#7a7167] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="font-display text-2xl font-bold text-dark mb-3">Ready to find your new home?</h2>
        <p className="text-[#7a7167] mb-8 max-w-md mx-auto">Join thousands of happy tenants who found their perfect PG on GharPayy.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="bg-brand hover:bg-brand-light text-white font-semibold rounded-lg px-8 py-3 no-underline transition-colors">
            Create Free Account
          </Link>
          <Link href="/search" className="border border-[#e8e2d8] hover:border-brand text-dark font-semibold rounded-lg px-8 py-3 no-underline transition-colors">
            Browse PGs
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
