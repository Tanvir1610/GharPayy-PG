'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { AdminSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Building2, MapPin, Search, ShieldCheck, ShieldOff } from 'lucide-react';
import { toast } from '@/components/ui/ToastContainer';

interface Property { id: string; name: string; city: string; address: string; gender_preference: string; is_verified: boolean; created_at: string; owner: { full_name: string; email: string } }

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  useEffect(()=>{ fetch('/api/admin/properties').then(r=>r.json()).then(j=>{setProperties(j.data||[]);setLoading(false);}); },[]);

  const toggleVerify = async (propertyId: string, isVerified: boolean) => {
    const res = await fetch('/api/admin/properties',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({propertyId,isVerified:!isVerified})});
    if (res.ok) { setProperties(prev=>prev.map(p=>p.id===propertyId?{...p,is_verified:!isVerified}:p)); toast({title:`Property ${!isVerified?'verified':'unverified'}`,variant:'success'}); }
    else toast({title:'Update failed',variant:'destructive'});
  };

  const filtered = properties.filter(p=>p.name?.toLowerCase().includes(search.toLowerCase())||p.city?.toLowerCase().includes(search.toLowerCase())||p.owner?.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Properties">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle>All Properties ({properties.length})</CardTitle>
            <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167]"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search properties…" className="pl-9 pr-3 py-2 rounded-lg border border-[#e8e2d8] text-sm bg-[#fdf9f4] focus:outline-none focus:border-brand w-60"/></div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <div className="space-y-3">{[...Array(5)].map((_,i)=><div key={i} className="h-20 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
          : filtered.length===0 ? <div className="text-center py-12 text-[#7a7167]"><Building2 size={40} className="mx-auto mb-3 text-[#b0a99f]"/><p className="font-medium">No properties found</p></div>
          : <div className="space-y-3">{filtered.map(p=>(
            <div key={p.id} className="flex items-start gap-4 p-4 bg-[#f8f5f1] rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0"><Building2 size={18} className="text-brand"/></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-dark">{p.name}</p>
                  <Badge variant={p.is_verified?'success':'warning'}>{p.is_verified?'Verified':'Pending'}</Badge>
                  <Badge variant="outline" className="capitalize">{p.gender_preference==='any'?'Co-ed':p.gender_preference}</Badge>
                </div>
                <p className="text-xs text-[#7a7167] flex items-center gap-1 mt-0.5"><MapPin size={10}/>{p.city} — {p.address}</p>
                <p className="text-xs text-[#7a7167] mt-0.5">Owner: {p.owner?.full_name} ({p.owner?.email})</p>
                <p className="text-xs text-[#7a7167]">Added: {new Date(p.created_at).toLocaleDateString()}</p>
              </div>
              <div className="shrink-0">
                <Button size="sm" variant={p.is_verified?'outline':'primary'} onClick={()=>toggleVerify(p.id,p.is_verified)} className="flex items-center gap-1.5">
                  {p.is_verified?<><ShieldOff size={13}/>Unverify</>:<><ShieldCheck size={13}/>Verify</>}
                </Button>
              </div>
            </div>
          ))}</div>}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
