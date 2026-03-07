import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import * as db from '../database/event'

export default {
    createEvent: defineAction({
        input: z.object({
            name: z.string(),
            start_at: z.coerce.date(),
            end_at: z.coerce.date(),
            series_id: z.string(),
            timezone: z.string()
        }),
        handler: async(input, context) => {
            return await db.addEvent(context?.session, input);
        }
    }),
    getEventsBySeriesId: defineAction({
        input: z.object({
            seriesId: z.string()
        }),
        handler: async(input, context) => {
            return await db.getEventsBySeriesId(context?.session, input.seriesId);
        }
    }),
    updateEvent: defineAction({
        input: z.object({
            id: z.string(),
            name: z.string(),
            start_at: z.coerce.date(),
            end_at: z.coerce.date(),
            series_id: z.string(),
            timezone: z.string()
        }),
        handler: async(input, context) => {
            return await db.updateEvent(context.session, input);
        }
    }),
    deleteEvent: defineAction({
        input: z.string(),
        handler: async(input, context) => {
            //return await db.deleteSeries(context.session, input);
        }
    })
}