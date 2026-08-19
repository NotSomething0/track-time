import { ActionError, type ActionAPIContext } from 'astro:actions';
import { handleAuthError, handlePostgrestError } from '$lib/supabase';

export default async(context: ActionAPIContext, series: { id: string, name: string, description: string }) => {
    const { data: claimsData, error: claimsError } = await context.locals.supabase.auth.getClaims();

    if (claimsError)
        handleAuthError(claimsError);

    if (!claimsData?.claims?.app_metadata?.admin)
        throw new ActionError({ code: 'UNAUTHORIZED', message: 'You are not authorized to perform this action'});

    const { data, error } = await context.locals.supabase
        .from('series')
        .upsert(series)
        .select()
        .single();

    if (error)
        handlePostgrestError(error);

    return data;
}
