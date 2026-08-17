import type { APIContext, MiddlewareNext } from "astro";

export default async function(context: APIContext, next: MiddlewareNext) {
  if (context.url.pathname.startsWith('/admin')) {
    context.request.headers.set('x-redirect-to', context.url.pathname);

    const { data, error } = await context.locals.supabase.auth.getClaims();

    if (error || !data?.claims )
      return context.redirect('/login');

    if (!data.claims.app_metadata?.admin)
      return context.redirect('/');
  }

  return next();
};