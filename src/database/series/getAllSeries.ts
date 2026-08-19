import { handleAuthError, handlePostgrestError } from "$lib/supabase";
import { ActionError, type ActionAPIContext } from "astro:actions";

export default async(context: ActionAPIContext) =>
{
    const { data: claimsData, error: claimsError} = await context.locals.supabase.auth.getClaims();

    if (claimsError)
        handleAuthError(claimsError);

    if (!claimsData?.claims?.app_metadata?.admin)
        throw new ActionError({ code: 'UNAUTHORIZED', message: 'You are not authorized to perform this action'});

    const { data, error } = await context.locals.supabase
        .from('series')
        .select(`
            id, 
            name, 
            description,
            next_event (
                *
            )
        `);

    if (error)
        handlePostgrestError(error);

    return data;
}
