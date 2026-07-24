import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json();
  const { email, token, password } = body;

  if (!email || !token || !password) {
    return new Response(JSON.stringify({ error: 'Email, code and password are required' }), { status: 400 });
  }
  if (password.length < 6) {
    return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400 });
  }

  // Verify OTP
  const { data, error } = await supabase.auth.verifyOtp({
    email, token, type: 'email',
  });

  if (error || !data.session) {
    return new Response(JSON.stringify({ error: error?.message || 'Invalid or expired code' }), { status: 400 });
  }

  // Set session so updateUser knows which user
  await supabase.auth.setSession(data.session);

  // Update user's password
  const { error: updateError } = await supabase.auth.updateUser({ password });

  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
  }

  // Set session cookies
  const secure = import.meta.env.PROD;
  cookies.set('sb-access-token', data.session.access_token, {
    path: '/', httpOnly: true, secure, sameSite: 'lax',
    maxAge: data.session.expires_in,
  });
  cookies.set('sb-refresh-token', data.session.refresh_token, {
    path: '/', httpOnly: true, secure, sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};