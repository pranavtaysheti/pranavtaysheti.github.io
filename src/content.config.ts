import { defineCollection } from "astro:content";
import { z } from "astro/zod"
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/[!_]*.(md|mdx)", base: "./blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().pipe(z.coerce.date())
        // date: z.string().transform((v) => v.split("-").reverse().join("-")).pipe(z.coerce.date()),
    })
})

export const collections = {
    "blog": blogCollection,
}