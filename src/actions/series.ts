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
            return await db.addSeries(context, input);
        }
    }),
    getSeriesById: defineAction({
        input: z.uuid(),
        handler: async(input, context) => {
            return await db.getSeriesById(context, input);
        }
    }),
    getAllSeries: defineAction({
        handler: async(_, context) => {
            return await db.getAllSeries(context);
        }
    }),
    updateSeries: defineAction({
        input: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string()
        }),
        handler: async(input, context) => {
            return await db.updateSeries(context, input);
        }
    }),
    deleteSeriesById: defineAction({
        input: z.uuid(),
        handler: async(input, context) => {
            return await db.deleteSeriesById(context, input);
        }
    })
}
