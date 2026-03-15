'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TenantSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge, type BadgeVariant } from '@/components/ui/Card';
import { Calendar } from 'lucide-react';

interface Booking {
  id: string; status: string; move_in_date: string; rent: number; notes?: string;
  property: { name: string; city: string; photos?: string[] };
  room: { room_type: string; rent: number };
}
const sv = (s: string): BadgeVariant => s === 'confirmed' ? 'success' : s === 'pending' ? 'warning' : s === 'cancelled' ? 'danger' : 'secondary';

export default function TenantBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/bookings').then(r=>r.json()).then(j=>{ setBookings(j.data||[]); setLoading(false); }); }, []);

  return (
    <DashboardLayout sidebar={<TenantSidebar />} title="My Bookings">
      <Card><CardHeader><CardTitle>All Bookings ({bookings.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <div className="space-y-3">{[...Array(4)].map((_,i)=><div key={i} className="h-16 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
          : bookings.length===0 ? <div className="text-center py-12 text-[#7a7167]"><Calendar size={40} className="mx-auto mb-3 text-[#b0a99f]"/><p className="font-medium">No bookings yet</p></div>
          : <div className="space-y-3">{bookings.map(b=>(
            <div key={b.id} className="flex items-center gap-4 p-4 bg-[#f8f5f1] rounded-xl">
              <div className="w-14 h-14 rounded-xl bg-[#e8e2d8] overflow-hidden shrink-0">
                {b.property?.photos?.[0] && <img src={b.property.photos[0]} alt="" className="w-full h-full object-cover"/>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark text-sm">{b.property?.name}</p>
                <p className="text-xs text-[#7a7167]">{b.property?.city} · {b.room?.room_type} room</p>
                <p className="text-xs text-[#7a7167]">Move-in: {new Date(b.move_in_date).toLocaleDateString()}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-dark">₹{b.rent}/mo</p>
                <Badge variant={sv(b.status)} className="mt-1">{b.status}</Badge>
              </div>
            </div>
          ))}</div>}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
