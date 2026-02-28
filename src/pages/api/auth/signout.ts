import type { APIRoute } from "astro";
import { getSupabaseClient } from "../../../lib/supabase";

export const GET: APIRoute = async ({ redirect, session }) => {
  const supabase = getSupabaseClient(session);

  // Get user data before signing out
  const { data: user, error } = await supabase.auth.getUser();
  
  // Handle any error or check for existing user
  if (error || !user) {
    console.log("No user to sign out.");
    return redirect("/login");
  }

  // Sign out the user
  await supabase.auth.signOut();

  // Delete session tokens
  session?.delete("sb-access-token");
  session?.delete("sb-refresh-token");

  console.log('here', await session?.get('sb-access-token'))

  return redirect("/login");
};