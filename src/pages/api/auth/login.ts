import type { APIRoute } from "astro";
import { getSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, session, redirect }) => {
  const payload = await request.json();
  const email = payload.email;
  const password = payload.password;

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { data, error } = await getSupabaseClient(session).auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message)
    return new Response(error.message, { status: 500 });
  }

  session?.set('profile', { 
    user_id: data.session.user.id,
    name: "Unknown"
  })

  const { access_token, refresh_token } = data.session;

  session?.set('sb-access-token', access_token);
  session?.set('sb-refresh-token', refresh_token);
  session?.delete('flash');

  const redirectTo = request.headers.get('x-redirect-to');

  if (redirectTo)
    return redirect(redirectTo);

  return redirect('/dashboard');
};