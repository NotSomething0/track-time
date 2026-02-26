import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import addSeries from '../database/addSeries';
import getAllSeries from '../database/getAllSeries';
import updateSeries from '../database/updateSeries';

export default {
    createSeries: defineAction({
        input: z.object({
            name: z.string(),
            description: z.string()
        }),
        handler: async(input, context) => {
            return await addSeries(context?.session, input);
        }
    }),
    getAllSeries: defineAction({
        handler: async(_, context) => {
            return await getAllSeries(context?.session);
        }
    }),
    updateSeries: defineAction({
        input: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string()
        }),
        handler: async(input, context) => {
            return await updateSeries(context.session, input);
        }
    })
}