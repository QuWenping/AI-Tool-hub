import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const accessToken = cookies.get('sb-access-token')?.value;

  if (!accessToken) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }

  try {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      return new Response(JSON.stringify({ user: null }), { status: 200 });
    }

    return new Response(JSON.stringify({ user: data.user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
};
