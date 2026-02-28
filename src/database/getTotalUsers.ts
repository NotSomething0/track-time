import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../lib/supabase';

export const getTotalUsers: any = async(session: AstroSession) => {
  const supabase = getSupabaseClient(session);

  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  return count || 0;
}