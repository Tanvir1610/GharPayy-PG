'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import { toast } from '@/components/ui/ToastContainer';

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Signed out successfully' });
    router.push('/');
    setUserMenuOpen(false);
  };

  const dashboardHref =
    user?.role === 'admin' ? '/admin' : user?.role === 'owner' ? '/owner' : '/dashboard';

  const navLinks = [
    { href: '/search', label: 'Find PG' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e8e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold text-dark no-underline">
          Ghar<span className="text-brand">Payy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#7a7167] hover:text-dark transition-colors no-underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#f5f0eb] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <User size={16} className="text-brand" />
                </div>
                <span className="text-sm font-medium text-dark">{user.fullName.split(' ')[0]}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl border border-[#e8e2d8] shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-[#e8e2d8]">
                    <p className="text-xs font-medium text-dark">{user.fullName}</p>
                    <p className="text-xs text-[#7a7167]">{user.email}</p>
                  </div>
                  <Link
                    href={dashboardHref}
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-dark hover:bg-[#f5f0eb] no-underline"
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e8e2d8] bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-dark py-1 no-underline"
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-[#e8e2d8]" />
          {user ? (
            <>
              <Link href={dashboardHref} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-dark no-underline">Dashboard</Link>
              <button onClick={handleSignOut} className="text-sm font-medium text-red-600 text-left">Sign out</button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="flex-1"><Button variant="outline" className="w-full" size="sm">Sign in</Button></Link>
              <Link href="/signup" className="flex-1"><Button className="w-full" size="sm">Get Started</Button></Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
