'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TenantSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui/Card';
import { CreditCard } from 'lucide-react';

interface Booking {
  _id: string; rent: number; status: string; moveInDate: string;
  propertyId: { name: string; city: string };
}

export default function TenantPaymentsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings').then(r => r.json()).then(j => {
      setBookings(j.data || []);
      setLoading(false);
    });
  }, []);

  const totalMonthly = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((s, b) => s + b.rent, 0);

  return (
    <DashboardLayout sidebar={<TenantSidebar />} title="Payments">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-[#7a7167] font-medium">Monthly Due</p>
              <p className="text-2xl font-bold text-dark mt-1">₹{totalMonthly.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-[#7a7167] font-medium">Active Bookings</p>
              <p className="text-2xl font-bold text-dark mt-1">{bookings.filter(b => b.status === 'confirmed').length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Payment Summary</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-[#f5f0eb] rounded-xl animate-pulse" />)}</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-[#7a7167]">
                <CreditCard size={40} className="mx-auto mb-3 text-[#b0a99f]" />
                <p className="font-medium">No payment records yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b._id} className="flex items-center gap-4 p-4 bg-[#f8f5f1] rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                      <CreditCard size={18} className="text-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-dark text-sm">{b.propertyId?.name}</p>
                      <p className="text-xs text-[#7a7167]">{b.propertyId?.city} · Move-in: {new Date(b.moveInDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-dark">₹{b.rent}/mo</p>
                      <Badge variant={b.status === 'confirmed' ? 'success' : b.status === 'pending' ? 'warning' : 'secondary'} className="mt-1">
                        {b.status}
                      </Badge>
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
