import type { AstroSession } from "astro";
import { getSupabaseClient } from "../../lib/supabase";

export default async (
  session: AstroSession | undefined,
  user_id: string,
): Promise<any> => {
  const supabase = getSupabaseClient(session);
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.log(
      "An error occured while trying to execute the getProfileById query",
      error,
    );
    return [];
  }

  return data;
};
