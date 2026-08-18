import type { ActionAPIContext } from 'astro:actions';
import { handlePostgrestError } from '$lib/supabase';

export default async(context: ActionAPIContext, series_id: string): Promise<any> => {
    const { data, error } = await context.locals.supabase
        .from('events')
        .select()
        .eq('series_id', series_id);

    if (error)
        handlePostgrestError(error);

    return data;
}