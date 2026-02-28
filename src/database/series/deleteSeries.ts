import type { AstroSession } from "astro";
import { getSupabaseClient } from "../../lib/supabase";

export default async(session: AstroSession|undefined, seriesId: string): Promise<any> =>
{
    const supabase = getSupabaseClient(session);

    if (!supabase) {
        console.log('supabase session error')
        return false;
    }

    const response = await supabase
        .from('series')
        .delete()
        .eq('id', seriesId);

    if (!response || response.status !== 204)
    {
        console.log('Failed to delete series')
        return false;
    }

    return true;
}