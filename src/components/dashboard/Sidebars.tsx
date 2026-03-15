'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Home, Calendar, Heart, MessageSquare, CreditCard, User,
  Building2, BedDouble, BarChart2, Users, ShieldCheck, LogOut, Eye,
} from 'lucide-react';
import { toast } from '@/components/ui/ToastContainer';
import { useRouter } from 'next/navigation';

interface NavItem { href: string; label: string; icon: React.ElementType }

function SidebarLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/owner' && item.href !== '/admin' && pathname.startsWith(item.href));
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors no-underline',
        active
          ? 'bg-brand/10 text-brand'
          : 'text-[#7a7167] hover:bg-[#f5f0eb] hover:text-dark'
      )}
    >
      <item.icon size={17} />
      {item.label}
    </Link>
  );
}

function SignOutButton() {
  const { signOut } = useAuth();
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut();
        toast({ title: 'Signed out' });
        router.push('/');
      }}
      className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
    >
      <LogOut size={17} />
      Sign Out
    </button>
  );
}

// ── Tenant Sidebar ────────────────────────────────────────────────────────────

const tenantNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: Calendar },
  { href: '/dashboard/visits', label: 'Visit Requests', icon: Eye },
  { href: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export function TenantSidebar() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-3 mb-1">
        <p className="text-xs font-semibold text-[#b0a99f] uppercase tracking-wide">Tenant</p>
        <p className="text-sm font-medium text-dark truncate mt-0.5">{user?.fullName}</p>
      </div>
      <div className="flex-1 space-y-0.5">
        {tenantNav.map((item) => <SidebarLink key={item.href} item={item} />)}
      </div>
      <div className="pb-4 border-t border-[#e8e2d8] pt-2">
        <Link href="/search" className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium text-[#7a7167] hover:bg-[#f5f0eb] hover:text-dark no-underline">
          <Home size={17} /> Browse PGs
        </Link>
        <SignOutButton />
      </div>
    </div>
  );
}

// ── Owner Sidebar ─────────────────────────────────────────────────────────────

const ownerNav: NavItem[] = [
  { href: '/owner', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/owner/properties', label: 'Properties', icon: Building2 },
  { href: '/owner/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/owner/bookings', label: 'Bookings', icon: Calendar },
  { href: '/owner/visits', label: 'Visits', icon: Eye },
  { href: '/owner/messages', label: 'Messages', icon: MessageSquare },
  { href: '/owner/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/owner/profile', label: 'Profile', icon: User },
];

export function OwnerSidebar() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-3 mb-1">
        <p className="text-xs font-semibold text-[#b0a99f] uppercase tracking-wide">Owner</p>
        <p className="text-sm font-medium text-dark truncate mt-0.5">{user?.fullName}</p>
      </div>
      <div className="flex-1 space-y-0.5">
        {ownerNav.map((item) => <SidebarLink key={item.href} item={item} />)}
      </div>
      <div className="pb-4 border-t border-[#e8e2d8] pt-2">
        <SignOutButton />
      </div>
    </div>
  );
}

// ── Admin Sidebar ─────────────────────────────────────────────────────────────

const adminNav: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
];

export function AdminSidebar() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-3 mb-1">
        <p className="text-xs font-semibold text-[#b0a99f] uppercase tracking-wide">Admin</p>
        <p className="text-sm font-medium text-dark truncate mt-0.5">{user?.fullName}</p>
        <span className="inline-flex items-center gap-1 mt-1 text-xs text-brand">
          <ShieldCheck size={11} /> Super Admin
        </span>
      </div>
      <div className="flex-1 space-y-0.5">
        {adminNav.map((item) => <SidebarLink key={item.href} item={item} />)}
      </div>
      <div className="pb-4 border-t border-[#e8e2d8] pt-2">
        <SignOutButton />
      </div>
    </div>
  );
}
