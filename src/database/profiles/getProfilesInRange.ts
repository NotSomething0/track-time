import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../../lib/supabase';

export default async(session: AstroSession | undefined, startIndex: number, endIndex: number): Promise<any> => {
    const supabase = getSupabaseClient(session);

    if (startIndex > endIndex || endIndex < startIndex) {
        throw new Error("Range is out of bounds")
    }

    const { data, error } = await supabase
        .from('profiles')
        .select()
        .range(startIndex, endIndex);

    if (error) {
        console.log('An error occured while trying to execute the getProfilesInRange query', error)
        return [];
    }

    return data;
}
