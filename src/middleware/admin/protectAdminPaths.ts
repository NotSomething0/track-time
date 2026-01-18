import type { APIContext, MiddlewareNext } from "astro";
import { getSupabaseClient } from "../../lib/supabase";

export default async function(context: APIContext, next: MiddlewareNext) {
  if (context.url.pathname.startsWith('/admin')) {
    const supabase = getSupabaseClient(context.session);

    if (!supabase) {
      console.error("Supabase client failed to initialize in middleware");
      return context.rewrite('/login');
    }

    const { data, error } = await supabase.auth.getClaims();

    if (error || !data )
      return context.rewrite('/login');

    if (!data.claims.app_metadata?.admin) {
      return context.rewrite(new Request("/login", {
      headers: {
        "x-redirect-to": context.url.pathname
      }
    }));
  }
  }

  return next();
};