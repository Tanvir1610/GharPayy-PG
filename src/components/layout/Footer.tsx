import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Youtube } from 'lucide-react';

const AREAS = [
  'Koramangala', 'Bellandur', 'Marathahalli', 'Mahadevapura',
  'Nagawara/Manyata', 'Electronic City', 'Whitefield', 'HSR Layout',
  'BTM Layout', 'JP Nagar', 'Jayanagar', 'MG Road',
];

export default function Footer() {
  return (
    <footer className="bg-[#0e0c0a] text-white/60 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <MapPin size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">GharPayy</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              Bangalore's most trusted PG platform. 120+ verified properties across 12+ areas. Fully furnished, meals included, no brokerage.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/gharpayy" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand flex items-center justify-center transition-colors">
                <Instagram size={14} className="text-white" />
              </a>
              <a href="https://youtube.com/@gharpayy" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand flex items-center justify-center transition-colors">
                <Youtube size={14} className="text-white" />
              </a>
            </div>
          </div>

          {/* Areas */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">PGs by Area</h4>
            <ul className="space-y-2">
              {AREAS.slice(0, 6).map(area => (
                <li key={area}>
                  <Link href={`/search?area=${encodeURIComponent(area)}`}
                    className="text-white/50 hover:text-brand transition-colors no-underline text-xs">
                    PG in {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">More Areas</h4>
            <ul className="space-y-2">
              {AREAS.slice(6).map(area => (
                <li key={area}>
                  <Link href={`/search?area=${encodeURIComponent(area)}`}
                    className="text-white/50 hover:text-brand transition-colors no-underline text-xs">
                    PG in {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://api.whatsapp.com/send?phone=918307396042"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-green-400 transition-colors no-underline text-xs">
                  <Phone size={13} />+91 83073 96042
                </a>
              </li>
              <li>
                <a href="mailto:hello@gharpayy.com"
                  className="flex items-center gap-2 text-white/50 hover:text-brand transition-colors no-underline text-xs">
                  <Mail size={13} />hello@gharpayy.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-white/40">
                <MapPin size={13} className="mt-0.5 shrink-0" />
                Koramangala, Bangalore — 560034
              </li>
            </ul>

            <div className="mt-5">
              <p className="text-xs text-white/40 mb-2">Quick Links</p>
              <div className="flex flex-col gap-1">
                {[
                  { label: 'Girls PGs', href: '/search?gender=female' },
                  { label: 'Boys PGs', href: '/search?gender=male' },
                  { label: 'Co-ed PGs', href: '/search?gender=any' },
                  { label: 'Budget PGs', href: '/search?type=budget' },
                  { label: 'Premium PGs', href: '/search?type=premium' },
                ].map(({ label, href }) => (
                  <Link key={label} href={href}
                    className="text-white/40 hover:text-brand transition-colors no-underline text-xs">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">© 2025 GharPayy. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-white/30">
            <span>No Brokerage</span>
            <span>·</span>
            <span>120+ Verified PGs</span>
            <span>·</span>
            <span>Bangalore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
