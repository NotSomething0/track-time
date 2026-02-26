import type { APIRoute } from "astro";
import { getSupabaseClient } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect, session }) => {
  const payload = await request.json();
  const email = payload.email;
  const password = payload.password;

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const supabase = getSupabaseClient(session)

  if (!supabase)
    return redirect('/login');

  const { error } = await supabase.auth.signUp({
    email,  
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  session?.set("flash", "Please check your email to confirm your account.")

  return redirect("/login");
};