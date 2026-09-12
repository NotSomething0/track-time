import { type ActionAPIContext, ActionError } from "astro:actions";
import { handleAuthError, handlePostgrestError } from "$lib/supabase";

export async function followSeriesById(
  context: ActionAPIContext,
  series_id: string,
) {
  const {
    data: { user },
    error: authError,
  } = await context.locals.supabase.auth.getUser();

  if (authError) handleAuthError(authError);
  if (!user)
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });

  const { error } = await context.locals.supabase
    .from("profile_followed_series")
    .upsert(
      { user_id: user?.id, series_id: series_id },
      { ignoreDuplicates: true },
    );

  if (error) handlePostgrestError(error);
}
