import { handleAuthError, handlePostgrestError } from "$lib/supabase";
import { ActionError, type ActionAPIContext } from "astro:actions";

export async function getAllSeries(context: ActionAPIContext) {
  const { data: claimsData, error: claimsError } =
    await context.locals.supabase.auth.getClaims();

  if (claimsError) handleAuthError(claimsError);

  if (claimsData?.claims?.role !== "authenticated")
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action",
    });

  const { data, error } = await context.locals.supabase.from("series").select(`
      id, 
      name,
      status,
      category,
      description,
      status,
      category,
      next_event (
          *
      )
  `);

  if (error) handlePostgrestError(error);

  return data;
}

export type SeriesWithNextEvent = NonNullable<
  Awaited<ReturnType<typeof getAllSeries>>
>[number];
