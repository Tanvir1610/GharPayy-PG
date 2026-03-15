'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { TenantSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Heart, MapPin, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/ToastContainer';

interface WishlistItem {
  id: string;
  property_id: string;
  property: { id: string; name: string; city: string; photos?: string[]; average_rating?: number };
}

export default function TenantWishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/wishlists').then(r=>r.json()).then(j=>{ setItems(j.data||[]); setLoading(false); }); }, []);

  const remove = async (propertyId: string) => {
    await fetch('/api/wishlists', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ propertyId }) });
    setItems(prev => prev.filter(i => i.property_id !== propertyId));
    toast({ title: 'Removed from wishlist' });
  };

  return (
    <DashboardLayout sidebar={<TenantSidebar />} title="Wishlist">
      <Card><CardHeader><CardTitle>Saved Properties ({items.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <div className="grid sm:grid-cols-2 gap-4">{[...Array(4)].map((_,i)=><div key={i} className="h-48 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
          : items.length===0 ? <div className="text-center py-12 text-[#7a7167]"><Heart size={40} className="mx-auto mb-3 text-[#b0a99f]"/><p className="font-medium">No saved properties</p><Link href="/search" className="text-brand text-sm mt-2 inline-block">Browse PGs →</Link></div>
          : <div className="grid sm:grid-cols-2 gap-4">{items.map(item=>{
            const p = item.property;
            return (
              <div key={item.id} className="rounded-xl border border-[#e8e2d8] overflow-hidden group">
                <div className="h-36 bg-[#f5f0eb] relative overflow-hidden">
                  {p?.photos?.[0] && <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>}
                  <button onClick={()=>remove(item.property_id)} className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow"><Trash2 size={13} className="text-red-500"/></button>
                </div>
                <div className="p-3">
                  <Link href={`/property/${p?.id}`} className="font-semibold text-sm text-dark hover:text-brand no-underline">{p?.name}</Link>
                  <p className="text-xs text-[#7a7167] flex items-center gap-1 mt-0.5"><MapPin size={10}/>{p?.city}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-[#7a7167]"><Star size={11} className="fill-brand text-brand"/>{p?.average_rating?.toFixed(1)||'New'}</div>
                </div>
              </div>
            );
          })}</div>}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
