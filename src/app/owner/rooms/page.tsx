'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { BedDouble, Plus, X } from 'lucide-react';
import { toast } from '@/components/ui/ToastContainer';

interface Room { id: string; room_type: string; total_beds: number; occupied_beds: number; rent: number; property: { name: string } }
interface Prop { id: string; name: string }

export default function OwnerRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [props, setProps] = useState<Prop[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ propertyId:'', roomType:'single', totalBeds:1, rent:0, amenities:'' });

  const reload = () => {
    Promise.all([fetch('/api/owner/rooms').then(r=>r.json()), fetch('/api/owner/properties').then(r=>r.json())])
      .then(([r,p])=>{ setRooms(r.data||[]); setProps(p.data||[]); setLoading(false); });
  };
  useEffect(()=>{ reload(); },[]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const res = await fetch('/api/owner/rooms',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({propertyId:form.propertyId,roomType:form.roomType,totalBeds:form.totalBeds,rent:form.rent,amenities:form.amenities.split(',').map(a=>a.trim()).filter(Boolean)})});
    if (res.ok) { toast({title:'Room added!',variant:'success'}); setShowModal(false); reload(); }
    else { const j=await res.json(); toast({title:'Error',description:j.error,variant:'destructive'}); }
    setSaving(false);
  };

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="Rooms">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#7a7167]">{rooms.length} rooms</p>
          <Button size="sm" onClick={()=>setShowModal(true)}><Plus size={15}/>Add Room</Button>
        </div>
        {loading ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(4)].map((_,i)=><div key={i} className="h-36 bg-[#f5f0eb] rounded-2xl animate-pulse"/>)}</div>
        : rooms.length===0 ? <Card><CardContent className="flex flex-col items-center py-16"><BedDouble size={44} className="text-[#b0a99f] mb-4"/><Button onClick={()=>setShowModal(true)}><Plus size={15}/>Add Room</Button></CardContent></Card>
        : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{rooms.map(r=>(
          <Card key={r.id}><CardContent className="pt-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center"><BedDouble size={18} className="text-brand"/></div>
              <div><p className="font-semibold text-dark capitalize">{r.room_type} Room</p><p className="text-xs text-[#7a7167]">{r.property?.name}</p></div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-[#7a7167]">Availability</span><span className={`font-medium ${r.occupied_beds>=r.total_beds?'text-red-500':'text-green-600'}`}>{r.total_beds-r.occupied_beds}/{r.total_beds} free</span></div>
              <div className="flex justify-between"><span className="text-[#7a7167]">Rent</span><span className="font-semibold text-dark">₹{r.rent}/mo</span></div>
            </div>
            <div className="mt-3 h-1.5 bg-[#f5f0eb] rounded-full overflow-hidden"><div className="h-full bg-brand rounded-full" style={{width:`${(r.occupied_beds/r.total_beds)*100}%`}}/></div>
          </CardContent></Card>
        ))}</div>}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#e8e2d8]"><h2 className="font-semibold text-dark">Add New Room</h2><button onClick={()=>setShowModal(false)}><X size={20} className="text-[#7a7167]"/></button></div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div><label className="block text-sm font-semibold text-dark mb-1.5">Property *</label>
                <select value={form.propertyId} onChange={e=>setForm(p=>({...p,propertyId:e.target.value}))} required className="w-full rounded-lg border border-[#e8e2d8] bg-[#fdf9f4] text-sm px-3.5 py-2.5 focus:outline-none focus:border-brand">
                  <option value="">Select property</option>{props.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-semibold text-dark mb-1.5">Room Type *</label>
                <select value={form.roomType} onChange={e=>setForm(p=>({...p,roomType:e.target.value}))} className="w-full rounded-lg border border-[#e8e2d8] bg-[#fdf9f4] text-sm px-3.5 py-2.5 focus:outline-none focus:border-brand">
                  {['single','double','triple','dormitory'].map(t=><option key={t} value={t} className="capitalize">{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input id="beds" type="number" label="Total Beds *" value={form.totalBeds} onChange={e=>setForm(p=>({...p,totalBeds:parseInt(e.target.value)}))} min={1} required/>
                <Input id="rent" type="number" label="Rent/bed (₹) *" value={form.rent} onChange={e=>setForm(p=>({...p,rent:parseInt(e.target.value)}))} min={0} required/>
              </div>
              <Input id="amen" label="Room Amenities" value={form.amenities} onChange={e=>setForm(p=>({...p,amenities:e.target.value}))} placeholder="AC, Attached Bath"/>
              <Button type="submit" loading={saving} className="w-full">Add Room</Button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
