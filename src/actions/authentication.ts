import { defineAction, type ActionAPIContext } from 'astro:actions';
import { z } from 'astro/zod';
import { handleAuthError } from '$lib/supabase';

export default {
    signUp: defineAction({
        accept: 'form',
        input: z.object({
            email: z.email(),
            password: z.string()
        }),
        handler: async(input: { email: string, password: string }, context: ActionAPIContext) => {
            const { error } = await context.locals.supabase.auth.signUp({
                email: input.email,
                password: input.password
            })

            if (error) {
                handleAuthError(error)
            }

            return { success: true }
        },
    }),
    signIn: defineAction({
        accept: 'form',
        input: z.object({
            email: z.email(),
            password: z.string()
        }),
        handler: async(input: { email: string , password: string}, context: ActionAPIContext) => {
            const { error } = await context.locals.supabase.auth.signInWithPassword({
                email: input.email,
                password: input.password
            });

            if (error) {
                handleAuthError(error)
            }

            return { success: true }
        }
    }),
    signOut: defineAction({
        handler: async (_, context: ActionAPIContext) => {
            const { error } = await context.locals.supabase.auth.signOut();

            if (error) { 
                handleAuthError(error)
            }

            return { success: true };
        }
    })
}
