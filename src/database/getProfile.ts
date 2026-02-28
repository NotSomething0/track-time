import type { AstroSession } from 'astro';
import { getSupabaseClient } from '../lib/supabase';

export const getProfile: any = async(session: AstroSession) => {
  const supabase = getSupabaseClient(session);

  if (!supabase) {
    console.log('supabase session error')
    return {};
  }

  let profile: App.SessionData['profile'] = await session?.get('profile');

  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('user_id', profile?.user_id )
    .single();

  if (error) {
    console.log('An error occured while trying to execute the getProfile query', error)
    return {};
  }

  return data
}