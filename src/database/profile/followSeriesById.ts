import { type ActionAPIContext } from "astro:actions";
import { handleAuthError, handlePostgrestError } from "$lib/supabase";

export default async (
  context: ActionAPIContext,
  series_id: string,
): Promise<void> => {
  const {
    data: { user },
    error: authError,
  } = await context.locals.supabase.auth.getUser();

  if (authError) handleAuthError(authError);

  const { error } = await context.locals.supabase
    .from("profile_followed_series")
    .upsert(
      { user_id: user?.id, series_id: series_id },
      { ignoreDuplicates: true },
    );

  if (error) handlePostgrestError(error);
};
