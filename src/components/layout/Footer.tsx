import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="font-display text-2xl font-bold text-white mb-3">
            Ghar<span className="text-brand">Payy</span>
          </p>
          <p className="text-sm leading-relaxed mb-4">
            Discover verified PG accommodations, hostels and rental rooms across India.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors no-underline"
          >
            <Phone size={13} />+91 83073 96042
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            {[
              ['Find PG', '/search'],
              ['Koramangala PGs', '/koramangala'],
              ['How It Works', '/how-it-works'],
              ['About', '/about'],
            ].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-brand transition-colors no-underline">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Popular Areas</p>
          <ul className="space-y-2 text-sm">
            {[
              ['Koramangala', '/search?city=Koramangala'],
              ['BTM Layout', '/search?city=BTM+Layout'],
              ['HSR Layout', '/search?city=HSR+Layout'],
              ['Bellandur', '/search?city=Bellandur'],
            ].map(([l, h]) => (
              <li key={l}>
                <Link href={h} className="flex items-center gap-1 hover:text-brand transition-colors no-underline">
                  <MapPin size={10} className="text-brand/60" />{l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Account</p>
          <ul className="space-y-2 text-sm mb-6">
            {[['Sign In', '/login'], ['Register', '/signup'], ['List Your PG', '/signup']].map(([l, h]) => (
              <li key={l}><Link href={h} className="hover:text-brand transition-colors no-underline">{l}</Link></li>
            ))}
          </ul>
          <p className="text-sm font-semibold text-white mb-3">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-brand transition-colors no-underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-brand transition-colors no-underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs py-4 px-4">
        © {new Date().getFullYear()} GharPayy. All rights reserved. · Made with ♥ in Bangalore
      </div>
    </footer>
  );
}
