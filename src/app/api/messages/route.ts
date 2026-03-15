import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:profiles!sender_id(id,full_name,avatar_url), receiver:profiles!receiver_id(id,full_name,avatar_url), property:properties(id,name)')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: false });
    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { receiverId, propertyId, content } = await req.json();
    if (!receiverId || !content) return err('receiverId and content are required');
    const { data, error } = await supabase.from('messages').insert({
      sender_id: user.id, receiver_id: receiverId, property_id: propertyId ?? null, content,
    }).select().single();
    if (error) return err(error.message, 400);
    return ok(data, 201);
  } catch { return err('Server error', 500); }
}
