'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Home, Search, Phone, Star, Heart, Calendar, LogOut, MapPin } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf9f4]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#7a7167]">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f4]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10 w-full flex-1">
        {/* Welcome */}
        <div className="bg-gradient-to-br from-[#1a1208] to-[#2a1d0a] rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(200,129,58,0.6) 0%, transparent 70%)' }} />
          <div className="relative">
            <p className="text-white/60 text-sm mb-1">Welcome back</p>
            <h1 className="font-display text-2xl font-bold text-white mb-2">{user.email}</h1>
            <p className="text-white/50 text-sm">Find your perfect PG in Bangalore</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Search, label: 'Browse PGs', desc: 'Search across all areas', href: '/search', color: 'bg-brand/10 text-brand' },
            { icon: MapPin, label: 'Koramangala PGs', desc: '30+ verified properties', href: '/koramangala', color: 'bg-purple-100 text-purple-600' },
            { icon: Phone, label: 'WhatsApp Us', desc: 'Get free assistance', href: 'https://api.whatsapp.com/send?phone=918307396042', color: 'bg-green-100 text-green-600', external: true },
            { icon: Heart, label: 'Saved PGs', desc: 'Your wishlist', href: '#', color: 'bg-pink-100 text-pink-600' },
            { icon: Calendar, label: 'Visits Scheduled', desc: 'Upcoming property tours', href: '#', color: 'bg-blue-100 text-blue-600' },
            { icon: Star, label: 'Reviews', desc: 'Share your experience', href: '#', color: 'bg-amber-100 text-amber-600' },
          ].map(({ icon: Icon, label, desc, href, color, external }) => (
            external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-2xl p-5 border border-[#e8e2d8] hover:shadow-md hover:-translate-y-0.5 transition-all no-underline group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="font-bold text-[#1a1208] text-sm group-hover:text-brand transition-colors">{label}</p>
                <p className="text-xs text-[#7a7167] mt-0.5">{desc}</p>
              </a>
            ) : (
              <Link key={label} href={href}
                className="bg-white rounded-2xl p-5 border border-[#e8e2d8] hover:shadow-md hover:-translate-y-0.5 transition-all no-underline group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="font-bold text-[#1a1208] text-sm group-hover:text-brand transition-colors">{label}</p>
                <p className="text-xs text-[#7a7167] mt-0.5">{desc}</p>
              </Link>
            )
          ))}
        </div>

        {/* Popular areas */}
        <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 mb-6">
          <h2 className="font-bold text-[#1a1208] mb-4">Explore by Area</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              'Koramangala', 'Bellandur', 'Marathahalli', 'Mahadevapura',
              'Whitefield', 'HSR Layout', 'BTM Layout', 'Electronic City',
              'Nagawara/Manyata', 'Jayanagar', 'MG Road', 'Indiranagar',
            ].map(area => (
              <Link key={area} href={`/search?area=${encodeURIComponent(area)}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-[#f8f5f1] hover:bg-brand/10 hover:border-brand border border-transparent transition-all no-underline group">
                <MapPin size={12} className="text-brand shrink-0" />
                <span className="text-xs font-semibold text-[#1a1208] group-hover:text-brand transition-colors">{area}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={async () => { await signOut(); router.push('/'); }}
          className="flex items-center gap-2 text-sm text-[#7a7167] hover:text-red-500 transition-colors"
        >
          <LogOut size={14} />Sign out
        </button>
      </div>
      <Footer />
    </div>
  );
}
