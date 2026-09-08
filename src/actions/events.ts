import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import * as db from "../database/events";
import { handleAuthError } from "$lib/supabase";

export default {
  createEvent: defineAction({
    input: z.object({
      name: z.string(),
      start_at: z.coerce.date(),
      end_at: z.coerce.date(),
      series_id: z.string(),
      timezone: z.string(),
    }),
    handler: async (input, context) => {
      const { data, error } = await context.locals.supabase.auth.getClaims();

      if (error) handleAuthError(error);

      if (!data?.claims.app_metadata?.admin)
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });

      return await db.createEvent(context, input);
    },
  }),
  getEventsBySeriesId: defineAction({
    input: z.object({
      seriesId: z.string(),
    }),
    handler: async (input, context) => {
      return await db.getEventsBySeriesId(context?.session, input.seriesId);
    },
  }),
  updateEvent: defineAction({
    input: z.object({
      id: z.string(),
      name: z.string(),
      start_at: z.coerce.date(),
      end_at: z.coerce.date(),
      series_id: z.string(),
      timezone: z.string(),
    }),
    handler: async (input, context) => {
      const { data, error } = await context.locals.supabase.auth.getClaims();

      if (error) handleAuthError(error);

      if (!data?.claims.app_metadata?.admin)
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });

      return await db.updateEvent(context, input);
    },
  }),
  deleteEvent: defineAction({
    input: z.string(),
    handler: async (input, context) => {
      //return await db.deleteSeries(context.session, input);
    },
  }),
};
