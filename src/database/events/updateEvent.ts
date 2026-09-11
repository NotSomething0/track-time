import { handlePostgrestError } from "$lib/supabase";
import type { ActionAPIContext } from "astro:actions";
import type { Event } from "../../database/events";

export async function updateEvent(context: ActionAPIContext, event: Event) {
  const { data, error } = await context.locals.supabase
    .from("events")
    .upsert(event)
    .select()
    .single();

  if (error) handlePostgrestError(error);

  return data;
}
