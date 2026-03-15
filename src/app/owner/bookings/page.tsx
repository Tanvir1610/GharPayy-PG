'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Calendar } from 'lucide-react';
import { toast } from '@/components/ui/ToastContainer';

interface Booking {
  id: string; status: string; move_in_date: string; rent: number;
  property: { name: string; city: string }; room: { room_type: string };
  user: { full_name: string; email: string; phone?: string };
}
const sv = (s: string) => s==='confirmed'?'success':s==='pending'?'warning':s==='cancelled'?'danger':'secondary' as 'success'|'warning'|'danger'|'secondary';

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ fetch('/api/owner/bookings').then(r=>r.json()).then(j=>{setBookings(j.data||[]);setLoading(false);}); },[]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bookings/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status}) });
    if (res.ok) { setBookings(prev=>prev.map(b=>b.id===id?{...b,status}:b)); toast({title:`Booking ${status}`,variant:'success'}); }
    else toast({title:'Update failed',variant:'destructive'});
  };

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="Booking Requests">
      <Card><CardHeader><CardTitle>All Bookings ({bookings.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <div className="space-y-3">{[...Array(4)].map((_,i)=><div key={i} className="h-20 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
          : bookings.length===0 ? <div className="text-center py-12 text-[#7a7167]"><Calendar size={40} className="mx-auto mb-3 text-[#b0a99f]"/><p className="font-medium">No booking requests yet</p></div>
          : <div className="space-y-3">{bookings.map(b=>(
            <div key={b.id} className="p-4 bg-[#f8f5f1] rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 font-bold text-brand">{b.user?.full_name?.[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-semibold text-dark">{b.user?.full_name}</p>
                    <Badge variant={sv(b.status)}>{b.status}</Badge>
                  </div>
                  <p className="text-xs text-[#7a7167]">{b.user?.email}</p>
                  <p className="text-xs text-[#7a7167] mt-1">{b.property?.name} · {b.room?.room_type} room</p>
                  <p className="text-xs text-[#7a7167]">Move-in: {new Date(b.move_in_date).toLocaleDateString()} · ₹{b.rent}/mo</p>
                </div>
              </div>
              {b.status==='pending' && (
                <div className="flex gap-2 mt-3 ml-14">
                  <Button size="sm" onClick={()=>updateStatus(b.id,'confirmed')}>Confirm</Button>
                  <Button size="sm" variant="danger" onClick={()=>updateStatus(b.id,'cancelled')}>Decline</Button>
                </div>
              )}
            </div>
          ))}</div>}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
