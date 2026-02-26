import { createClient } from '@supabase/supabase-js';
import type { AstroSession } from 'astro';

export const getSupabaseClient = (session: AstroSession | undefined) => {
  return createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_PUB_KEY,
    {
      auth: {
        autoRefreshToken: false,
        storage: {
          getItem: async (key: string) => {
            return await session?.get(key) ?? null;
          },
          setItem: async (key: string, value: string) => {
            try {
              session?.set(key, value);
            } catch {
              console.log(`Failed to setItem ${key} ${value}`);
            }
          },
          removeItem: async (key: string) => {
            try {
              session?.set(key, undefined);
            } catch {
              console.log(`Failed to removeItem ${key}`);
            }
          },
        },
      },
    }
  );
};