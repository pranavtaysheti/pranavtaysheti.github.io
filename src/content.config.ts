import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
    loader: glob({ pattern: "**\/[^_]*.md", base: ".//blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().pipe(z.coerce.date())
        // date: z.string().transform((v) => v.split("-").reverse().join("-")).pipe(z.coerce.date()),
    })
})

export const collections = {
    "blog": blogCollection
}