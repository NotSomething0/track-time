/// <reference types="vite-plugin-pwa/info" />

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
  interface SessionData {
    'sb-access-token': string,
    'sb-refresh-token': string,
    profile: null | undefined | {
      user_id: string;
      name: string;
    };
  }
}