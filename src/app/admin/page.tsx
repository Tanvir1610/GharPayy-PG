'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { AdminSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Users, Building2, Calendar, Star, TrendingUp, ShieldCheck } from 'lucide-react';

interface Stats {
  totalUsers: number; totalProperties: number; verifiedProperties: number;
  totalBookings: number; pendingBookings: number; totalReviews: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(j => {
      setStats(j.data);
      setLoading(false);
    });
  }, []);

  const cards = [
    { title: 'Total Users', value: stats?.totalUsers ?? 0, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { title: 'Total Properties', value: stats?.totalProperties ?? 0, icon: Building2, color: 'bg-brand/10 text-brand' },
    { title: 'Verified Properties', value: stats?.verifiedProperties ?? 0, icon: ShieldCheck, color: 'bg-green-50 text-green-600' },
    { title: 'Total Bookings', value: stats?.totalBookings ?? 0, icon: Calendar, color: 'bg-purple-50 text-purple-600' },
    { title: 'Pending Bookings', value: stats?.pendingBookings ?? 0, icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600' },
    { title: 'Total Reviews', value: stats?.totalReviews ?? 0, icon: Star, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Admin Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <Card key={c.title}>
              <CardContent className="pt-5">
                <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center mb-3`}>
                  <c.icon size={20} />
                </div>
                <p className="text-xs text-[#7a7167] font-medium">{c.title}</p>
                <p className="text-3xl font-bold text-dark mt-1">{loading ? '—' : c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Platform Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#7a7167]">Property Verification Rate</span>
                  <span className="font-semibold text-dark">
                    {stats && stats.totalProperties > 0
                      ? Math.round((stats.verifiedProperties / stats.totalProperties) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-2 bg-[#f5f0eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${stats && stats.totalProperties > 0 ? (stats.verifiedProperties / stats.totalProperties) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#7a7167]">Booking Confirmation Rate</span>
                  <span className="font-semibold text-dark">
                    {stats && stats.totalBookings > 0
                      ? Math.round(((stats.totalBookings - stats.pendingBookings) / stats.totalBookings) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-2 bg-[#f5f0eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: `${stats && stats.totalBookings > 0 ? ((stats.totalBookings - stats.pendingBookings) / stats.totalBookings) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
