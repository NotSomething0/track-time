import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import * as db from '../database/series'

export default {
    createSeries: defineAction({
        input: z.object({
            name: z.string(),
            description: z.string()
        }),
        handler: async(input, context) => {
            return await db.addSeries(context?.session, input);
        }
    }),
    getAllSeries: defineAction({
        handler: async(_, context) => {
            return await db.getAllSeries(context?.session);
        }
    }),
    updateSeries: defineAction({
        input: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string()
        }),
        handler: async(input, context) => {
            return await db.updateSeries(context.session, input);
        }
    }),
    deleteSeries: defineAction({
        input: z.string(),
        handler: async(input, context) => {
            return await db.deleteSeries(context.session, input);
        }
    })
}