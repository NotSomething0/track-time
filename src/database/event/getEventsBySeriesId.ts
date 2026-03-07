import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../../lib/supabase';

export default async(session: AstroSession | undefined, series_id: string): Promise<any> => {    
    const supabase = getSupabaseClient(session);

    const { data, error } = await supabase
        .from('event')
        .select()
        .eq('series_id', series_id);

    if (error) {
        console.log('An error occured while trying to execute the getEventsBySeriesId query', error)
        return [];
    }

    return data;
}