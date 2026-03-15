'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { AdminSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { BarChart2, TrendingUp, Users, Building2 } from 'lucide-react';

interface Stats {
  totalUsers: number; totalProperties: number; verifiedProperties: number;
  totalBookings: number; pendingBookings: number; totalReviews: number;
}

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(j => {
      setStats(j.data);
      setLoading(false);
    });
  }, []);

  const verifyRate = stats && stats.totalProperties > 0
    ? Math.round((stats.verifiedProperties / stats.totalProperties) * 100) : 0;
  const confirmRate = stats && stats.totalBookings > 0
    ? Math.round(((stats.totalBookings - stats.pendingBookings) / stats.totalBookings) * 100) : 0;

  const metrics = [
    { label: 'Total Users', value: stats?.totalUsers ?? 0, icon: Users, color: 'text-blue-500' },
    { label: 'Total Properties', value: stats?.totalProperties ?? 0, icon: Building2, color: 'text-brand' },
    { label: 'Total Bookings', value: stats?.totalBookings ?? 0, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Reviews', value: stats?.totalReviews ?? 0, icon: BarChart2, color: 'text-purple-500' },
  ];

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Analytics">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="pt-5">
                <m.icon size={20} className={`${m.color} mb-3`} />
                <p className="text-xs text-[#7a7167] font-medium">{m.label}</p>
                <p className="text-3xl font-bold text-dark mt-1">{loading ? '—' : m.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Property Verification Rate</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <span className="text-4xl font-bold text-dark">{verifyRate}%</span>
                <span className="text-sm text-[#7a7167]">{stats?.verifiedProperties} / {stats?.totalProperties} verified</span>
              </div>
              <div className="h-3 bg-[#f5f0eb] rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{ width: `${verifyRate}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Booking Confirmation Rate</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <span className="text-4xl font-bold text-dark">{confirmRate}%</span>
                <span className="text-sm text-[#7a7167]">{stats?.pendingBookings} pending</span>
              </div>
              <div className="h-3 bg-[#f5f0eb] rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-700" style={{ width: `${confirmRate}%` }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Platform Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Avg Properties / Owner', value: stats ? (stats.totalProperties / Math.max(stats.totalUsers, 1)).toFixed(1) : '—' },
                { label: 'Pending Bookings', value: stats?.pendingBookings ?? '—' },
                { label: 'Unverified Properties', value: stats ? stats.totalProperties - stats.verifiedProperties : '—' },
              ].map((s) => (
                <div key={s.label} className="p-4 bg-[#f8f5f1] rounded-xl">
                  <p className="text-xs text-[#7a7167]">{s.label}</p>
                  <p className="text-2xl font-bold text-dark mt-1">{loading ? '—' : s.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
