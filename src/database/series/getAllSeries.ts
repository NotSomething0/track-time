import type { AstroSession } from "astro";
import { getSupabaseClient } from "../lib/supabase";

export default async(session: AstroSession|undefined): Promise<any> =>
{
    if (!session)
        console.log('no session');

    const supabase = getSupabaseClient(session);

    if (!supabase) {
        console.log('supabase session error')
        return {};
    }

    const { data, error } = await supabase
        .from('series')
        .select();


    if (error) {
        console.log('An error occured while trying to execute the addSeries query', error)
        return {};
    }

    return data;
}