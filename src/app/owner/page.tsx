'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge, type BadgeVariant } from '@/components/ui/Card';
import { Building2, Calendar, Users, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

interface Stats { properties: number; bookings: number; occupancy: number; revenue: number }
interface Booking { id: string; status: string; move_in_date: string; rent: number; property: { name: string }; room: { room_type: string }; user: { full_name: string } }
const sv = (s: string): BadgeVariant => s==='confirmed'?'success':s==='pending'?'warning':s==='cancelled'?'danger':'secondary';

export default function OwnerDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ properties:0,bookings:0,occupancy:0,revenue:0 });
  const [recent, setRecent] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/owner/stats').then(r=>r.json()), fetch('/api/owner/bookings').then(r=>r.json())])
      .then(([s,b]) => { setStats(s.data||{properties:0,bookings:0,occupancy:0,revenue:0}); setRecent((b.data||[]).slice(0,5)); setLoading(false); });
  }, []);

  const cards = [
    { title:'Total Properties', value:stats.properties, icon:Building2, href:'/owner/properties', color:'text-brand' },
    { title:'Total Bookings', value:stats.bookings, icon:Calendar, href:'/owner/bookings', color:'text-blue-500' },
    { title:'Occupancy Rate', value:`${stats.occupancy}%`, icon:Users, href:'/owner/rooms', color:'text-green-600' },
    { title:'Monthly Revenue', value:`₹${(stats.revenue||0).toLocaleString()}`, icon:IndianRupee, href:'/owner/analytics', color:'text-brand' },
  ];

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="Owner Dashboard">
      <div className="space-y-6">
        <p className="text-[#7a7167] text-sm">Welcome, <span className="font-semibold text-dark">{user?.fullName}</span> 👋</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map(s=>(
            <Link key={s.title} href={s.href} className="no-underline">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader><div className="flex items-center justify-between"><CardTitle className="text-xs text-[#7a7167] font-medium">{s.title}</CardTitle><s.icon size={16} className={s.color}/></div></CardHeader>
                <CardContent><div className="text-3xl font-bold text-dark">{loading?'—':s.value}</div></CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <Card>
          <CardHeader><CardTitle>Recent Booking Requests</CardTitle></CardHeader>
          <CardContent>
            {loading ? <div className="space-y-3">{[...Array(3)].map((_,i)=><div key={i} className="h-14 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
            : recent.length===0 ? <p className="text-center text-[#7a7167] py-8 text-sm">No booking requests yet.</p>
            : <div className="space-y-3">{recent.map(b=>(
              <div key={b.id} className="flex items-center gap-4 p-3 bg-[#f8f5f1] rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-dark">{b.user?.full_name||'Guest'}</p>
                  <p className="text-xs text-[#7a7167]">{b.property?.name} · {b.room?.room_type} room</p>
                  <p className="text-xs text-[#7a7167]">Move-in: {new Date(b.move_in_date).toLocaleDateString()}</p>
                </div>
                <div className="text-right shrink-0"><p className="font-bold text-dark text-sm">₹{b.rent}/mo</p><Badge variant={sv(b.status)} className="mt-1">{b.status}</Badge></div>
              </div>
            ))}</div>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
