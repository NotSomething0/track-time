import { getSupabaseClient } from "$lib/supabase";
import type { APIContext, MiddlewareNext } from "astro";

export default async (context: APIContext, next: MiddlewareNext) => {
    context.locals.supabase = getSupabaseClient(context);

    return next();
};
