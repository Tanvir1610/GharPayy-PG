import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden, notFound } from '@/lib/api';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('properties')
      .select('*, owner:profiles!owner_id(full_name,email,phone)')
      .eq('id', id)
      .single();
    if (error || !data) return notFound('Property');
    return ok(data);
  } catch { return err('Server error', 500); }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: prop } = await supabase.from('properties').select('owner_id').eq('id', id).single();
    if (!prop) return notFound('Property');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (prop.owner_id !== user.id && profile?.role !== 'admin') return forbidden();

    const updates = await req.json();
    delete updates.owner_id;
    if (profile?.role !== 'admin') delete updates.is_verified;

    const { data, error } = await supabase.from('properties').update(updates).eq('id', id).select().single();
    if (error) return err(error.message, 400);
    return ok(data);
  } catch { return err('Server error', 500); }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: prop } = await supabase.from('properties').select('owner_id').eq('id', id).single();
    if (!prop) return notFound('Property');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (prop.owner_id !== user.id && profile?.role !== 'admin') return forbidden();

    await supabase.from('properties').delete().eq('id', id);
    return ok({ deleted: true });
  } catch { return err('Server error', 500); }
}
