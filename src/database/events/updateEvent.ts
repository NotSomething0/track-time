import { handlePostgrestError } from "$lib/supabase";
import type { ActionAPIContext } from "astro:actions";

export async function updateEvent(context: ActionAPIContext, event: any) {
  const { data, error } = await context.locals.supabase
    .from("events")
    .upsert(event)
    .select()
    .single();

  if (error) handlePostgrestError(error);

  return data;
}

export type Event = NonNullable<Awaited<ReturnType<typeof updateEvent>>>;
