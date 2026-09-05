import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import * as db from "../database/profiles";
import * as series from "../database/series";
import * as events from "../database/events";
import { handleAuthError } from "$lib/supabase";

export default {
  getAllProfiles: defineAction({
    input: z.object({
      username: z.string(),
    }),
    handler: async (input, context) => {
      const { data, error } = await context.locals.supabase.auth.getClaims();

      if (error) handleAuthError(error);

      if (!data?.claims?.app_metadata?.admin)
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });

      return await db.getAllProfiles(context, input);
    },
  }),
  getAllEvents: defineAction({
    handler: async (_, context) => {
      const { data, error } = await context.locals.supabase.auth.getClaims();

      if (error) handleAuthError(error);

      if (!data?.claims?.app_metadata?.admin)
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });

      return await events.getAllEvents(context);
    },
  }),
  getSeriesOptions: defineAction({
    handler: async (_, context) => {
      const { data, error } = await context.locals.supabase.auth.getClaims();

      if (error) handleAuthError(error);

      if (!data?.claims.app_metadata?.admin)
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });

      return await series.getSeriesOptions(context);
    },
  }),
};
