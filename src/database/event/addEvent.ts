import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../../lib/supabase';

export default async(session: AstroSession | undefined, event: any): Promise<any> => {    
    const supabase = getSupabaseClient(session);
    const { data, error } = await supabase
        .from('event')
        .insert(event)
        .select()
        .single();

    if (error) {
        console.log('An error occured while trying to execute the addEvent query', error)
        return {};
    }

    return data;
}
