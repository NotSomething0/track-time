import { handlePostgrestError } from "$lib/supabase";
import type { ActionAPIContext } from "astro:actions";

export default async(context: ActionAPIContext, seriesId: string) => {
    const { data: series, error } = await context.locals.supabase
        .from('series')
        .select()
        .eq('id', seriesId);

    if (error)
        handlePostgrestError(error);

    return series;
}
