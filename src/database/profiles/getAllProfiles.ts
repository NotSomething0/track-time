import { handlePostgrestError } from "$lib/supabase";
import { type ActionAPIContext } from "astro:actions";

export default async (
  context: ActionAPIContext,
  filter: { username: string },
) => {
  let profilesQuery = context.locals.supabase.from("profiles").select();

  if (filter.username)
    profilesQuery = profilesQuery.ilike("username", `%${filter.username}%`);

  const { data, error } = await profilesQuery;

  if (error) handlePostgrestError(error);

  return data;
};
