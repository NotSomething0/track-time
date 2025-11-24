export const prerender = false;

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const payload = await request.json();
  const email = payload.email;
  const password = payload.password;

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,  
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  cookies.set('flash', "Please check your email to confirm your account.", {
    path: "/login",
    httpOnly: true,
    maxAge: 60
  })

  return redirect("/login");
};