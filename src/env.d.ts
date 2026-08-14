interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_PUB_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface SeriesData {
  id: string?,
  name: string,
  description: string
}

declare namespace App {
  interface Locals {
    supabase: import('@supabase/supabase-js').SupabaseClient
  };
}
