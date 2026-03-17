'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin, Search } from 'lucide-react';

const NAV = [
  { label: 'Browse PGs', href: '/search' },
  { label: 'Koramangala', href: '/koramangala' },
  { label: 'All Areas', href: '/search' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0e0c0a]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <MapPin size={15} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">GharPayy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ label, href }) => (
            <Link key={label} href={href}
              className="text-sm text-white/60 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all no-underline">
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/search"
            className="flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all no-underline">
            <Search size={13} />Search
          </Link>
          <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors no-underline">
            <Phone size={13} />+91 83073 96042
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)} className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0e0c0a] border-t border-white/10 px-4 py-3 flex flex-col gap-2">
          {NAV.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}
              className="text-sm text-white/70 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all no-underline">
              {label}
            </Link>
          ))}
          <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl mt-1 no-underline">
            <Phone size={14} />WhatsApp Us — +91 83073 96042
          </a>
        </div>
      )}
    </header>
  );
}
