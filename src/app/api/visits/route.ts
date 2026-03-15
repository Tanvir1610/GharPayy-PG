import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized } from '@/lib/api';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { data, error } = await supabase
      .from('visits')
      .select('*, property:properties(id,name,city,address)')
      .eq('user_id', user.id)
      .order('visit_date', { ascending: true });
    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();
    const { propertyId, visitDate, visitTime, notes } = await req.json();
    if (!propertyId || !visitDate || !visitTime) return err('propertyId, visitDate, visitTime are required');
    const { data, error } = await supabase.from('visits').insert({
      user_id: user.id, property_id: propertyId, visit_date: visitDate, visit_time: visitTime, notes,
    }).select().single();
    if (error) return err(error.message, 400);
    return ok(data, 201);
  } catch { return err('Server error', 500); }
}
