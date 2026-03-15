'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, sidebar, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex">
      {/* Sidebar – desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#e8e2d8] shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#e8e2d8]">
          <Link href="/" className="font-display text-xl font-bold text-dark no-underline">
            Ghar<span className="text-brand">Payy</span>
          </Link>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">{sidebar}</nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-50 w-64 bg-white flex flex-col shadow-xl">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#e8e2d8]">
              <Link href="/" className="font-display text-xl font-bold text-dark no-underline">
                Ghar<span className="text-brand">Payy</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>
            <nav className="flex-1 py-4 overflow-y-auto">{sidebar}</nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#e8e2d8] flex items-center gap-4 px-4 sm:px-6 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#f5f0eb]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h1 className="font-display text-lg font-semibold text-dark">{title}</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
