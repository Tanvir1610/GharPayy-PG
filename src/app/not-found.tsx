import Link from 'next/link';
import { Search, Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <div className="flex-1 flex items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md">
          <div className="text-8xl mb-6">🏠</div>
          <h1 className="font-display text-3xl font-bold text-[#1a1208] mb-3">Page not found</h1>
          <p className="text-[#7a7167] mb-8">
            Looks like this page has moved. But don&apos;t worry — we have 120+ verified PGs waiting for you!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/search"
              className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors no-underline">
              <Search size={15} />Browse PGs
            </Link>
            <Link href="/"
              className="flex items-center justify-center gap-2 border border-[#e8e2d8] text-[#1a1208] hover:border-brand hover:text-brand font-semibold px-6 py-3 rounded-xl text-sm transition-colors no-underline">
              <Home size={15} />Go Home
            </Link>
          </div>
          <div className="mt-8">
            <a href="https://api.whatsapp.com/send?phone=918307396042&text=Hi%20GharPayy!%20I%20need%20help%20finding%20a%20PG"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium no-underline">
              <Phone size={14} />Or WhatsApp us for instant help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
