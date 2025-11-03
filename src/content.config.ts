import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blogCollection = defineCollection({
    loader: glob({ pattern: "**\/[^_]*.md", base: "./blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().pipe(z.coerce.date())
        // date: z.string().transform((v) => v.split("-").reverse().join("-")).pipe(z.coerce.date()),
    })
})

const resume = defineCollection({
    loader: glob({pattern: "**\/[^_]*.yaml",base: "./resume"}),
    schema: z.object({
        basics: z.object({
            name: z.string(),
            label: z.string(),
            email: z.string().email(),
            phone: z.number(),
            url: z.string().url(),
            summary: z.string(),

            location: z.object({
                address: z.string(),
                postalCode: z.number(),
                city: z.string(),
                country: z.string(),
                state: z.string()
            }),

            profiles: z.array(z.object({
                network: z.string(),
                username: z.string(),
                url: z.string().url(),
            })),
        }),

        work: z.array(z.object({
            name: z.string(),
            position: z.string(),
            url: z.string().url().optional(),
            startDate: z.coerce.date(),
            endDate: z.coerce.date(),
            highlights: z.array(z.string())
        })),

        project: z.array(z.object({
            name: z.string(),
            date: z.coerce.date(),
            skills: z.array(z.string()),
            highlights: z.array(z.string())
        })),

        volunteer: z.array(z.object({
            organization: z.string(),
            position: z.string(),
            url: z.string().url().optional(),
            startDate: z.coerce.date(),
            endDate: z.coerce.date(),
            highlights: z.array(z.string())
        })),

        education: z.array(z.object({
            institute: z.string(),
            url: z.string().url(),
            course: z.string(),
            degree: z.string(),
            startDate: z.coerce.date(),
            endDate: z.coerce.date(),
            CGPA: z.number()
        })),

        certificates: z.array(z.object({
            name: z.string(),
            date: z.coerce.date(),
            issuer: z.string(),
            url: z.string().url()
        })),

        publications: z.array(z.object({
            name: z.string(),
            publisher: z.string(),
            url: z.string().url(),
        })),

        skills: z.array(z.object({
            name: z.string(),
            keywords: z.array(z.string()),
            level: z.number().int().min(1).max(5)
        }))
    })
})

export const collections = {
    "blog": blogCollection,
    "resume": resume
}