import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../../lib/supabase';
import { type Event } from '../../types/database';

export default async(session: AstroSession | undefined, event: Event): Promise<any> => {
    if (!event.id)
    {
        console.log('no id???')
        return []
    }

    const supabase = getSupabaseClient(session);

    const { data, error } = await supabase
        .from('events')
        .upsert(event)
        .select()
        .single();

    if (error) {
        console.log('An error occured while trying to execute the updateEvent query', error)
        return [];
    }

    return data;
}