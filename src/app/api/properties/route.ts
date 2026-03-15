import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ok, err, unauthorized, forbidden } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const gender = searchParams.get('gender');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '12'));

    let query = supabase
      .from('properties')
      .select('*, owner:profiles!owner_id(full_name,email,phone)', { count: 'exact' })
      .eq('is_verified', true)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (city) query = query.ilike('city', `%${city}%`);
    if (gender && gender !== 'any') query = query.in('gender_preference', [gender, 'any']);

    const { data, error, count } = await query;
    if (error) return err(error.message, 400);

    return ok({ properties: data, total: count, page, pages: Math.ceil((count ?? 0) / limit) });
  } catch (e: unknown) {
    console.error(e);
    return err('Server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorized();

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!['owner', 'admin'].includes(profile?.role ?? '')) return forbidden();

    const body = await req.json();
    const { name, address, city, description, genderPreference, amenities, rules } = body;
    if (!name || !address || !city) return err('name, address and city are required');

    const { data, error } = await supabase.from('properties').insert({
      name, address, city, description,
      gender_preference: genderPreference ?? 'any',
      amenities: Array.isArray(amenities) ? amenities : [],
      rules, owner_id: user.id,
    }).select().single();

    if (error) return err(error.message, 400);
    return ok(data, 201);
  } catch (e: unknown) {
    console.error(e);
    return err('Server error', 500);
  }
}
