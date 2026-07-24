import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 });
  }

  if (data.session) {
    const secure = import.meta.env.PROD;
    cookies.set('sb-access-token', data.session.access_token, {
      path: '/', httpOnly: true, secure, sameSite: 'lax',
      maxAge: data.session.expires_in,
    });
    cookies.set('sb-refresh-token', data.session.refresh_token, {
      path: '/', httpOnly: true, secure, sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};