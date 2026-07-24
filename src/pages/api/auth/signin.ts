import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, url }) => {
  const body = await request.json();
  const provider = body.provider as 'google' | 'github' | 'apple';
  if (!['google', 'github', 'apple'].includes(provider)) {
    return new Response(JSON.stringify({ error: 'Invalid provider' }), { status: 400 });
  }

  const redirectTo = `${url.origin}/api/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      queryParams: provider === 'google' ? { access_type: 'offline', prompt: 'consent' } : undefined,
    },
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ url: data.url }), { status: 200 });
};
