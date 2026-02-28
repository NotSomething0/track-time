import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../../lib/supabase';

export default async(session: AstroSession | undefined, series: any): Promise<any> => {
    if (!series.id)
    {
        console.log('no id???')
        return []
    }

    const supabase = getSupabaseClient(session);

    if (!supabase) {
        console.log('supabase session error')
        return [];
    }

    const { data, error } = await supabase
        .from('series')
        .upsert(series)
        .select()
        .single();

    if (error) {
        console.log('An error occured while trying to execute the updateSeries query', error)
        return [];
    }

    return data;
}