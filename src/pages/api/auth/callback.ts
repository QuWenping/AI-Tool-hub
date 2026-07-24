import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code');
  if (!code) {
    return redirect('/?error=no_code');
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    return redirect('/?error=auth_failed');
  }

  // Set session cookies
  const secure = import.meta.env.PROD;
  cookies.set('sb-access-token', data.session.access_token, {
    path: '/',
    httpOnly: true,
    secure,
    sameSite: 'lax',
    maxAge: data.session.expires_in,
  });
  cookies.set('sb-refresh-token', data.session.refresh_token, {
    path: '/',
    httpOnly: true,
    secure,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });

  return redirect('/');
};
