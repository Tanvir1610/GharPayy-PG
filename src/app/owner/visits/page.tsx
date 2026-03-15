'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui/Card';
import { Eye, MapPin, Calendar } from 'lucide-react';

interface Visit {
  _id: string; status: string; visitDate: string; visitTime: string;
  propertyId: { name: string; city: string };
  userId: { fullName: string; email: string };
}

const statusVariant = (s: string) =>
  s === 'scheduled' ? 'warning' : s === 'completed' ? 'success' : 'danger';

export default function OwnerVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/owner/visits').then(r => r.json()).then(j => {
      setVisits(j.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="Visit Requests">
      <Card>
        <CardHeader><CardTitle>Scheduled Visits ({visits.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-[#f5f0eb] rounded-xl animate-pulse" />)}</div>
          ) : visits.length === 0 ? (
            <div className="text-center py-12 text-[#7a7167]">
              <Eye size={40} className="mx-auto mb-3 text-[#b0a99f]" />
              <p className="font-medium">No visit requests yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {visits.map((v) => (
                <div key={v._id} className="flex items-start gap-4 p-4 bg-[#f8f5f1] rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 font-bold text-brand">
                    {v.userId?.fullName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-dark text-sm">{v.userId?.fullName}</p>
                    <p className="text-xs text-[#7a7167]">{v.userId?.email}</p>
                    <p className="text-xs text-[#7a7167] flex items-center gap-1 mt-1"><MapPin size={10} />{v.propertyId?.name}, {v.propertyId?.city}</p>
                    <p className="text-xs text-[#7a7167] flex items-center gap-1"><Calendar size={10} />{new Date(v.visitDate).toLocaleDateString()} at {v.visitTime}</p>
                  </div>
                  <Badge variant={statusVariant(v.status)}>{v.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
