import { z } from "zod";

export const defineFetchResponseSchema = <T extends z.Schema<unknown>>(itemSchema: T) =>
    z.object({
        count: z.number(),
        results: z.array(itemSchema),
        next: z.string().nullable().optional(),             // Nullable string (URI) for `next`
        previous: z.string().nullable().optional(),        // Nullable string (URI) for 
    });

export const genreSchema = z.object({
    id: z.number(),
    name: z.string(),
    image_background: z.string()
})
type Genre = z.infer<typeof genreSchema>

export const platformSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
})
type Platform = z.infer<typeof platformSchema>

export const publisherSchema = z.object({
    id: z.number(),
    name: z.string()
})
type Publisher = z.infer<typeof publisherSchema>

export const screenshotSchema = z.object({
    id: z.number(),
    image: z.string(),
    width: z.number(),
    height: z.number(),
    hidden: z.boolean().optional()
})
type Screenshot = z.infer<typeof screenshotSchema>

export const trailerSchema = z.object({
    id: z.number(),
    name: z.string(),
    preview: z.string(),
    data: z.object({
        max: z.string(),
        480: z.string(),
    })
})
type Trailer = z.infer<typeof trailerSchema>

export const gameSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    genres: z.array(genreSchema),
    publishers: z.array(publisherSchema),
    description_raw: z.string(),
    background_image: z.string(),
    parent_platforms: z.array(z.object({
        platform: platformSchema
    })),
    metacritic: z.number(),
    rating_top: z.number(),
    // screenshots: z.array(screenshotSchema),
    // trailers: z.array(trailerSchema)
})

type Game = z.infer<typeof gameSchema>
export type { Game, Platform, Genre, Publisher, Screenshot, Trailer }
