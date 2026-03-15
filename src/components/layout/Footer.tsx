import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="font-display text-2xl font-bold text-white mb-3">
            Ghar<span className="text-brand">Payy</span>
          </p>
          <p className="text-sm leading-relaxed">
            Discover verified PG accommodations, hostels and rental rooms across India.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            {[['Find PG', '/search'], ['How It Works', '/how-it-works'], ['About', '/about']].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-brand transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Account</p>
          <ul className="space-y-2 text-sm">
            {[['Sign In', '/login'], ['Register', '/signup'], ['List Your PG', '/signup']].map(([l, h]) => (
              <li key={l}><Link href={h} className="hover:text-brand transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs py-4 px-4">
        © {new Date().getFullYear()} GharPayy. All rights reserved.
      </div>
    </footer>
  );
}
