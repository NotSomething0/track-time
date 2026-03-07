import type { APIContext, MiddlewareNext } from "astro";
import { getSupabaseClient } from "../../lib/supabase";

export default async function(context: APIContext, next: MiddlewareNext) {
  if (context.url.pathname.startsWith('/admin')) {
    context.request.headers.set('x-redirect-to', context.url.pathname);

    const supabase = getSupabaseClient(context.session);
    const { data, error } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (error || !user ) {
      context.session?.set('flash', 'You need to login')
      return context.rewrite('/login');
    }

    if (!user.app_metadata?.admin)
      return context.rewrite('/login');
  }

  return next();
};