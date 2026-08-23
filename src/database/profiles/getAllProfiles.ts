import { handleAuthError, handlePostgrestError } from "$lib/supabase";
import { ActionError, type ActionAPIContext } from "astro:actions";

export default async (
  context: ActionAPIContext,
  filter: { username: string },
): Promise<any> => {
  const { data: claimsData, error: claimsError } =
    await context.locals.supabase.auth.getClaims();

  if (claimsError) handleAuthError(claimsError);

  if (!claimsData?.claims?.app_metadata?.admin)
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });

  let profilesQuery = context.locals.supabase.from("profiles").select();

  if (filter.username)
    profilesQuery = profilesQuery.ilike("username", `%${filter.username}%`);

  const { data, error } = await profilesQuery;

  if (error) handlePostgrestError(error);

  return data;
};
