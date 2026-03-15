'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TenantSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui/Card';
import { Calendar, Eye, Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

interface Stats { bookings: number; visits: number; wishlist: number; messages: number }
interface Booking { _id: string; status: string; moveInDate: string; rent: number; propertyId: { name: string; city: string; photos?: string[] } }

export default function TenantDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ bookings: 0, visits: 0, wishlist: 0, messages: 0 });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/bookings').then((r) => r.json()),
      fetch('/api/visits').then((r) => r.json()),
      fetch('/api/wishlists').then((r) => r.json()),
      fetch('/api/messages').then((r) => r.json()),
    ]).then(([b, v, w, m]) => {
      const bData: Booking[] = b.data || [];
      setStats({
        bookings: bData.length,
        visits: (v.data || []).filter((x: { status: string }) => x.status === 'scheduled').length,
        wishlist: (w.data || []).length,
        messages: (m.data || []).filter((x: { isRead: boolean; receiverId: { _id: string } }) => !x.isRead && x.receiverId?._id !== user?.id).length,
      });
      setBookings(bData.slice(0, 5));
      setLoading(false);
    });
  }, [user?.id]);

  const statCards = [
    { title: 'Active Bookings', value: stats.bookings, icon: Calendar, href: '/dashboard/bookings', color: 'text-brand' },
    { title: 'Upcoming Visits', value: stats.visits, icon: Eye, href: '/dashboard/visits', color: 'text-blue-500' },
    { title: 'Saved Properties', value: stats.wishlist, icon: Heart, href: '/dashboard/wishlist', color: 'text-red-500' },
    { title: 'Unread Messages', value: stats.messages, icon: MessageSquare, href: '/dashboard/messages', color: 'text-green-600' },
  ];

  const statusVariant = (s: string) =>
    s === 'confirmed' ? 'success' : s === 'pending' ? 'warning' : s === 'cancelled' ? 'danger' : 'secondary';

  return (
    <DashboardLayout sidebar={<TenantSidebar />} title="My Dashboard">
      <div className="space-y-6">
        <p className="text-[#7a7167] text-sm">Welcome back, <span className="font-semibold text-dark">{user?.fullName}</span> 👋</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <Link key={s.title} href={s.href} className="no-underline">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs text-[#7a7167] font-medium">{s.title}</CardTitle>
                    <s.icon size={16} className={s.color} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-dark">{loading ? '—' : s.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Recent Bookings</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-[#f5f0eb] rounded-lg animate-pulse" />)}</div>
            ) : bookings.length === 0 ? (
              <p className="text-center text-[#7a7167] py-8 text-sm">No bookings yet. <Link href="/search" className="text-brand">Browse PGs →</Link></p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b._id} className="flex items-center gap-3 p-3 bg-[#f8f5f1] rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-[#e8e2d8] overflow-hidden shrink-0">
                      {b.propertyId?.photos?.[0] && (
                        <img src={b.propertyId.photos[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-dark text-sm truncate">{b.propertyId?.name}</p>
                      <p className="text-xs text-[#7a7167]">{b.propertyId?.city} · Move-in: {new Date(b.moveInDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-dark">₹{b.rent}/mo</p>
                      <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
