import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../../lib/supabase';

export default async(session: AstroSession | undefined): Promise<any> => {    
    const supabase = getSupabaseClient(session);

    if (!supabase) {
        console.log('supabase session error')
        return [];
    }

    const { data, error } = await supabase
        .from('profiles')
        .select();

    if (error) {
        console.log('An error occured while trying to execute the getEventsBySeriesId query', error)
        return [];
    }

    return data;
}