'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { OwnerSidebar } from '@/components/dashboard/Sidebars';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Message { id: string; content: string; is_read: boolean; created_at: string; sender: { id: string; full_name: string }; receiver: { id: string; full_name: string }; property?: { name: string } }

export default function OwnerMessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ fetch('/api/messages').then(r=>r.json()).then(j=>{setMessages(j.data||[]);setLoading(false);}); },[]);

  return (
    <DashboardLayout sidebar={<OwnerSidebar />} title="Messages">
      <Card><CardHeader><CardTitle>All Messages ({messages.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <div className="space-y-3">{[...Array(4)].map((_,i)=><div key={i} className="h-16 bg-[#f5f0eb] rounded-xl animate-pulse"/>)}</div>
          : messages.length===0 ? <div className="text-center py-12 text-[#7a7167]"><MessageSquare size={40} className="mx-auto mb-3 text-[#b0a99f]"/><p className="font-medium">No messages yet</p></div>
          : <div className="divide-y divide-[#e8e2d8]">{messages.map(m=>{
            const isMine = m.sender?.id===user?.id;
            const other = isMine?m.receiver:m.sender;
            return (
              <div key={m.id} className={`flex gap-3 py-4 ${!m.is_read&&!isMine?'bg-brand/5 -mx-5 px-5 rounded-xl':''}`}>
                <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand font-bold text-sm">{other?.full_name?.[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2"><p className="font-semibold text-sm text-dark">{other?.full_name}</p><span className="text-xs text-[#7a7167] shrink-0">{new Date(m.created_at).toLocaleDateString()}</span></div>
                  {m.property&&<p className="text-xs text-brand">Re: {m.property.name}</p>}
                  <p className="text-sm text-[#7a7167] truncate">{isMine&&<span className="text-[#b0a99f]">You: </span>}{m.content}</p>
                </div>
                {!m.is_read&&!isMine&&<div className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0"/>}
              </div>
            );
          })}</div>}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
