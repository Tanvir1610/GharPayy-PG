'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/ToastContainer';
import { User, Mail, Phone } from 'lucide-react';

export default function OwnerProfilePage() {
  const { user, refreshUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/auth/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, phone }),
    });
    if (res.ok) {
      await refreshUser();
      toast({ title: 'Profile updated', variant: 'success' });
    } else {
      toast({ title: 'Update failed', variant: 'destructive' });
    }
    setSaving(false);
  };

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="My Profile">
      <div className="max-w-lg">
        <Card>
          <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6 p-4 bg-[#f8f5f1] rounded-xl">
              <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-brand">{user?.fullName?.[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-dark">{user?.fullName}</p>
                <p className="text-sm text-[#7a7167]">{user?.email}</p>
                <span className="inline-block mt-1 text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full">Property Owner</span>
              </div>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <Input id="name" label="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} icon={<User size={15} />} required />
              <Input id="email" type="email" label="Email" value={user?.email || ''} icon={<Mail size={15} />} disabled />
              <Input id="phone" label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9876543210" icon={<Phone size={15} />} />
              <Button type="submit" loading={saving} className="w-full">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
