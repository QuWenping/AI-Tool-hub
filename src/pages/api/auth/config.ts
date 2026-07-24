import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      supabaseUrl: import.meta.env.SUPABASE_URL,
      supabaseAnonKey: import.meta.env.SUPABASE_ANON_KEY,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
