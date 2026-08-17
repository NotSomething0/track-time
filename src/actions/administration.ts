import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import * as db from '../database/profiles'


export default {
    getAllProfiles: defineAction({
        input: z.object({
            username: z.string(),
        }),
        handler: async(input, context) => {
            return await db.getAllProfiles(context, input);
        }
    })
}
