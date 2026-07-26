import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  const body = await request.json();
  const provider = body.provider as string;

  if (!['google', 'github', 'apple'].includes(provider)) {
    return new Response(
      JSON.stringify({ error: 'Invalid provider. Must be: google, github, or apple' }),
      { status: 400 }
    );
  }

  const redirectTo = `${url.origin}/api/auth/callback`;
  console.log(`[OAuth] Provider: ${provider}, Redirect: ${redirectTo}`);

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo,
        skipBrowserRedirect: true, // Let client handle redirect
      },
    });

    if (error) {
      console.error(`[OAuth Error] ${provider}:`, error);
      return new Response(
        JSON.stringify({
          error: error.message || `Failed to initiate ${provider} OAuth`,
          details: error.message,
        }),
        { status: 500 }
      );
    }

    if (!data.url) {
      console.error(`[OAuth Error] No URL from ${provider}`);
      return new Response(
        JSON.stringify({ error: `${provider} OAuth provider did not return a URL` }),
        { status: 500 }
      );
    }

    console.log(`[OAuth Success] Generated URL for ${provider}`);
    return new Response(JSON.stringify({ url: data.url }), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[OAuth Exception] ${provider}:`, message);
    return new Response(
      JSON.stringify({ error: `OAuth exception: ${message}` }),
      { status: 500 }
    );
  }
};
