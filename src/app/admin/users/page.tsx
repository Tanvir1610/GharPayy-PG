'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { AdminSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Users, Search } from 'lucide-react';
import { toast } from '@/components/ui/ToastContainer';

interface User { id: string; full_name: string; email: string; role: string; is_active: boolean; created_at: string }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  useEffect(()=>{ fetch('/api/admin/users').then(r=>r.json()).then(j=>{setUsers(j.data||[]);setLoading(false);}); },[]);

  const toggleActive = async (userId: string, isActive: boolean) => {
    const res = await fetch('/api/admin/users',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId,isActive:!isActive})});
    if (res.ok) { setUsers(prev=>prev.map(u=>u.id===userId?{...u,is_active:!isActive}:u)); toast({title:`User ${isActive?'deactivated':'activated'}`,variant:'success'}); }
  };
  const changeRole = async (userId: string, role: string) => {
    const res = await fetch('/api/admin/users',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId,role})});
    if (res.ok) { setUsers(prev=>prev.map(u=>u.id===userId?{...u,role}:u)); toast({title:'Role updated',variant:'success'}); }
  };

  const filtered = users.filter(u=>u.full_name?.toLowerCase().includes(search.toLowerCase())||u.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Users">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle>All Users ({users.length})</CardTitle>
            <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7167]"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users…" className="pl-9 pr-3 py-2 rounded-lg border border-[#e8e2d8] text-sm bg-[#fdf9f4] focus:outline-none focus:border-brand w-56"/></div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <div className="space-y-3">{[...Array(5)].map((_,i)=><div key={i} className="h-14 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
          : filtered.length===0 ? <div className="text-center py-12 text-[#7a7167]"><Users size={40} className="mx-auto mb-3 text-[#b0a99f]"/><p className="font-medium">No users found</p></div>
          : <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead><tr className="border-b border-[#e8e2d8]">
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#7a7167] uppercase">User</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#7a7167] uppercase">Role</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#7a7167] uppercase">Status</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-[#7a7167] uppercase">Joined</th>
              <th className="text-right py-3 px-2 text-xs font-semibold text-[#7a7167] uppercase">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#f5f0eb]">{filtered.map(u=>(
              <tr key={u.id} className="hover:bg-[#f8f5f1]">
                <td className="py-3 px-2"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand font-bold text-xs">{u.full_name?.[0]}</div><div><p className="font-medium text-dark">{u.full_name}</p><p className="text-xs text-[#7a7167]">{u.email}</p></div></div></td>
                <td className="py-3 px-2"><select value={u.role} onChange={e=>changeRole(u.id,e.target.value)} className="text-xs rounded-lg border border-[#e8e2d8] px-2 py-1 focus:outline-none focus:border-brand bg-white"><option value="tenant">Tenant</option><option value="owner">Owner</option><option value="admin">Admin</option></select></td>
                <td className="py-3 px-2"><Badge variant={u.is_active?'success':'secondary'}>{u.is_active?'Active':'Inactive'}</Badge></td>
                <td className="py-3 px-2 text-[#7a7167]">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-2 text-right"><Button size="sm" variant={u.is_active?'danger':'outline'} onClick={()=>toggleActive(u.id,u.is_active)}>{u.is_active?'Deactivate':'Activate'}</Button></td>
              </tr>
            ))}</tbody>
          </table></div>}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
