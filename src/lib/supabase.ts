import type { APIContext } from "astro";
import type { AuthError, PostgrestError } from "@supabase/supabase-js";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { ActionError, type ActionAPIContext } from "astro:actions";

export const getSupabaseClient = (context: APIContext | ActionAPIContext) => {
    return createServerClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        {
            cookies: {
                getAll() {
                    return parseCookieHeader(context.request.headers.get("Cookie") ?? "");
                },
                setAll(cookiesToSet: { name: string; value: string }[]) {
                    cookiesToSet.forEach(({ name, value }) => {
                            context.cookies.set(name, value, {
                            path: "/",
                            secure: import.meta.env.PROD,
                        });
                    });
                },
            },
        },
    );
};

export function handleAuthError(error: AuthError) {
    switch (error.code) {
        case "weak_password":
            throw new ActionError({
                code: "UNPROCESSABLE_CONTENT",
                message: error.message,
            });
        default:
            console.log(
                "An error occured while handling auth related shit that we don't handle directly",
            );
            console.log(error);
            throw new ActionError({
                code: "UNPROCESSABLE_CONTENT",
                message: error.message,
            });
    }
}

export function handlePostgrestError(error: PostgrestError) {
    switch (error.code) {
        default:
            console.error('A PostgrestError has occured that we don\'t handle yet', error)
            throw new ActionError({ code: 'INTERNAL_SERVER_ERROR' })
    }
}
