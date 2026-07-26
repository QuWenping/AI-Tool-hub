import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // Handle OAuth errors from provider
  if (error) {
    const errorMsg = errorDescription || error || 'Unknown error';
    console.error('OAuth error:', errorMsg);
    return redirect(`/?error=${encodeURIComponent(errorMsg)}`);
  }

  if (!code) {
    console.error('No authorization code received');
    return redirect('/?error=no_code');
  }

  try {
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data.session) {
      const msg = exchangeError?.message || 'Failed to exchange code for session';
      console.error('Exchange error:', msg);
      return redirect(`/?error=${encodeURIComponent(msg)}`);
    }

    // Set session cookies
    const secure = import.meta.env.PROD;
    const maxAge = data.session.expires_in || 3600;

    cookies.set('sb-access-token', data.session.access_token, {
      path: '/',
      httpOnly: true,
      secure,
      sameSite: 'lax',
      maxAge,
    });

    cookies.set('sb-refresh-token', data.session.refresh_token || '', {
      path: '/',
      httpOnly: true,
      secure,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });

    // Success - redirect to home
    return redirect('/');
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error during auth';
    console.error('Auth callback error:', msg);
    return redirect(`/?error=${encodeURIComponent(msg)}`);
  }
};
