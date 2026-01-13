import type { AstroSession } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const getSupabaseClient = (session: AstroSession) => {
  return createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_PUB_KEY,
    {
      auth: {
        storage: {
          getItem: async (key: string) => {
            return await session?.get(key) ?? null;
          },
          setItem: async (key: string, value: string) => {
            session?.set(key, value);
          },
          removeItem: async (key: string) => {
            session?.set(key, undefined);
          },
        },
      },
    }
  );
};