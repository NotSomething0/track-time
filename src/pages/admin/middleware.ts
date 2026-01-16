import { defineMiddleware } from "astro:middleware";
import { getSupabaseClient } from "../../lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/admin')) {
    const supabase = getSupabaseClient(context.session);

    if (!supabase) {
      console.error("Supabase client failed to initialize in middleware");
      return context.redirect('/login');
    }

    const { data, error } = await supabase.auth.getClaims();

    if (error || !data )
      return context.redirect('/login');

    if (!data.claims.app_metadata?.admin)
      return context.redirect('/login');
  }

  return next();
});