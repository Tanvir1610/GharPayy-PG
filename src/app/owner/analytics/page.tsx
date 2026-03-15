'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Building2, Users, IndianRupee, TrendingUp } from 'lucide-react';

interface Stats { properties: number; bookings: number; occupancy: number; revenue: number }

export default function OwnerAnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/owner/stats').then(r => r.json()).then(j => {
      setStats(j.data);
      setLoading(false);
    });
  }, []);

  const cards = [
    { title: 'Total Properties', value: stats?.properties ?? 0, icon: Building2, color: 'bg-brand/10 text-brand' },
    { title: 'Total Bookings', value: stats?.bookings ?? 0, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
    { title: 'Occupancy Rate', value: `${stats?.occupancy ?? 0}%`, icon: Users, color: 'bg-green-50 text-green-600' },
    { title: 'Total Revenue', value: `₹${(stats?.revenue ?? 0).toLocaleString()}`, icon: IndianRupee, color: 'bg-brand/10 text-brand' },
  ];

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="Analytics">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Card key={c.title}>
              <CardContent className="pt-5">
                <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center mb-3`}>
                  <c.icon size={20} />
                </div>
                <p className="text-xs text-[#7a7167] font-medium">{c.title}</p>
                <p className="text-2xl font-bold text-dark mt-1">{loading ? '—' : c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Performance Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#7a7167]">Occupancy Rate</span>
                  <span className="font-semibold text-dark">{stats?.occupancy ?? 0}%</span>
                </div>
                <div className="h-2 bg-[#f5f0eb] rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${stats?.occupancy ?? 0}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#f8f5f1] rounded-xl">
                  <p className="text-xs text-[#7a7167]">Avg Revenue / Property</p>
                  <p className="text-xl font-bold text-dark mt-1">
                    ₹{stats && stats.properties > 0 ? Math.round(stats.revenue / stats.properties).toLocaleString() : 0}
                  </p>
                </div>
                <div className="p-4 bg-[#f8f5f1] rounded-xl">
                  <p className="text-xs text-[#7a7167]">Avg Bookings / Property</p>
                  <p className="text-xl font-bold text-dark mt-1">
                    {stats && stats.properties > 0 ? (stats.bookings / stats.properties).toFixed(1) : 0}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
