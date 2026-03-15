'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardContent, Badge } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Building2, Plus, MapPin, Star, Edit, Trash2, X } from 'lucide-react';
import { toast } from '@/components/ui/ToastContainer';

interface Property {
  _id: string; name: string; city: string; address: string;
  photos?: string[]; amenities: string[]; averageRating?: number;
  genderPreference: string; isVerified: boolean;
}

interface FormState {
  name: string; address: string; city: string; description: string;
  genderPreference: string; amenities: string; rules: string;
}

const EMPTY_FORM: FormState = { name: '', address: '', city: '', description: '', genderPreference: 'any', amenities: '', rules: '' };

export default function OwnerPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchProperties = () => {
    setLoading(true);
    fetch('/api/owner/properties').then(r => r.json()).then(j => {
      setProperties(j.data || []);
      setLoading(false);
    });
  };

  useEffect(() => { fetchProperties(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        amenities: form.amenities.split(',').map(a => a.trim()).filter(Boolean),
      }),
    });
    if (res.ok) {
      toast({ title: 'Property created!', variant: 'success' });
      setShowModal(false);
      setForm(EMPTY_FORM);
      fetchProperties();
    } else {
      const j = await res.json();
      toast({ title: 'Error', description: j.error, variant: 'destructive' });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this property?')) return;
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: 'Property deleted' });
      setProperties(prev => prev.filter(p => p._id !== id));
    } else {
      toast({ title: 'Delete failed', variant: 'destructive' });
    }
  };

  const f = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="My Properties">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#7a7167]">{properties.length} {properties.length === 1 ? 'property' : 'properties'}</p>
          <Button size="sm" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Add Property
          </Button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-56 bg-[#f5f0eb] rounded-2xl animate-pulse" />)}</div>
        ) : properties.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Building2 size={44} className="text-[#b0a99f] mb-4" />
              <h3 className="font-semibold text-lg mb-1">No properties yet</h3>
              <p className="text-sm text-[#7a7167] mb-4">Add your first PG property to get started</p>
              <Button onClick={() => setShowModal(true)}><Plus size={15} /> Add Property</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {properties.map((p) => (
              <Card key={p._id} className="overflow-hidden">
                <div className="h-36 bg-[#f5f0eb] relative">
                  {p.photos?.[0] ? (
                    <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 size={36} className="text-[#b0a99f]" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant={p.isVerified ? 'success' : 'secondary'}>
                      {p.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-dark">{p.name}</h3>
                      <p className="text-xs text-[#7a7167] flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {p.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#7a7167]">
                      <Star size={12} className="fill-brand text-brand" />
                      {p.averageRating?.toFixed(1) || 'New'}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.amenities?.slice(0, 3).map(a => (
                      <span key={a} className="text-xs bg-[#f5f0eb] text-[#7a7167] px-2 py-0.5 rounded-full">{a}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit size={13} /> Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Property Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#e8e2d8]">
              <h2 className="font-semibold text-dark">Add New Property</h2>
              <button onClick={() => setShowModal(false)} className="text-[#7a7167] hover:text-dark"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <Input id="name" label="Property Name *" value={form.name} onChange={f('name')} placeholder="e.g. Sunrise PG" required />
              <div className="grid grid-cols-2 gap-3">
                <Input id="city" label="City *" value={form.city} onChange={f('city')} required />
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Gender Preference</label>
                  <select value={form.genderPreference} onChange={f('genderPreference')}
                    className="w-full rounded-lg border border-[#e8e2d8] bg-[#fdf9f4] text-sm px-3.5 py-2.5 focus:outline-none focus:border-brand">
                    <option value="any">Co-ed</option>
                    <option value="male">Male Only</option>
                    <option value="female">Female Only</option>
                  </select>
                </div>
              </div>
              <Input id="address" label="Full Address *" value={form.address} onChange={f('address')} required />
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">Description</label>
                <textarea value={form.description} onChange={f('description')} rows={3} placeholder="Describe your property..."
                  className="w-full rounded-lg border border-[#e8e2d8] bg-[#fdf9f4] text-sm px-3.5 py-2.5 focus:outline-none focus:border-brand resize-none" />
              </div>
              <Input id="amenities" label="Amenities (comma-separated)" value={form.amenities} onChange={f('amenities')} placeholder="WiFi, AC, Meals, Laundry" />
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">House Rules</label>
                <textarea value={form.rules} onChange={f('rules')} rows={2} placeholder="No smoking, No pets..."
                  className="w-full rounded-lg border border-[#e8e2d8] bg-[#fdf9f4] text-sm px-3.5 py-2.5 focus:outline-none focus:border-brand resize-none" />
              </div>
              <Button type="submit" loading={saving} className="w-full">Create Property</Button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
