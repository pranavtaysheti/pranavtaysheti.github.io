import { z, defineCollection } from "astro:content";

export const ProfileScheme = z.object({
  Name: z.string(),
  "Short Description": z.string(),
  "Long Description": z.string(),
  Contact: z.object({
    Email: z.string().email(),
    Phone: z.string(),
    Address: z.string(),
  }),
  "Work experience": z.array(z.object({
    Position: z.string(),
    Company: z.string(),
  }))
});

const profileCollection = defineCollection({
  type: "data",
  schema: ProfileScheme
})

export const collections = {
  "profile": profileCollection,
}