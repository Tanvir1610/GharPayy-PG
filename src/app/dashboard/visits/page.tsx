'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TenantSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui/Card';
import { Eye, MapPin, Calendar } from 'lucide-react';

interface Visit {
  id: string; status: string; visit_date: string; visit_time: string;
  property: { name: string; city: string };
}
const sv = (s: string) => s==='scheduled'?'warning':s==='completed'?'success':'danger' as 'warning'|'success'|'danger';

export default function TenantVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/visits').then(r=>r.json()).then(j=>{ setVisits(j.data||[]); setLoading(false); }); }, []);

  return (
    <DashboardLayout sidebar={<TenantSidebar />} title="Visit Requests">
      <Card><CardHeader><CardTitle>Scheduled Visits ({visits.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <div className="space-y-3">{[...Array(3)].map((_,i)=><div key={i} className="h-16 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
          : visits.length===0 ? <div className="text-center py-12 text-[#7a7167]"><Eye size={40} className="mx-auto mb-3 text-[#b0a99f]"/><p className="font-medium">No visits scheduled</p></div>
          : <div className="space-y-3">{visits.map(v=>(
            <div key={v.id} className="flex items-center gap-4 p-4 bg-[#f8f5f1] rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0"><Calendar size={18} className="text-brand"/></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-dark text-sm">{v.property?.name}</p>
                <p className="text-xs text-[#7a7167] flex items-center gap-1"><MapPin size={10}/>{v.property?.city}</p>
                <p className="text-xs text-[#7a7167]">{new Date(v.visit_date).toLocaleDateString()} at {v.visit_time}</p>
              </div>
              <Badge variant={sv(v.status)}>{v.status}</Badge>
            </div>
          ))}</div>}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
