import { handleAuthError, handlePostgrestError } from '$lib/supabase';
import { ActionError, type ActionAPIContext } from 'astro:actions';

export default async(context: ActionAPIContext, series: any): Promise<any> => {
    const { data: claimsData, error: claimsError } = await context.locals.supabase.auth.getClaims();

    if (claimsError)
        handleAuthError(claimsError);

    if (!claimsData?.claims?.app_metadata?.admin)
        throw new ActionError({ code: 'UNAUTHORIZED', message: 'Not authorized to preform this action.' });

    const { data, error } = await context.locals.supabase
        .from('series')
        .insert(series)
        .select()
        .single();

    if (error)
        handlePostgrestError(error);

    return data;
}
