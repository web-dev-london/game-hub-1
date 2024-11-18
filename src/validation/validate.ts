import { z } from "zod";

export const gameQuerySchema = z.object({
  genreName: z.string().optional(),
  platformId: z.number().optional(),
  sortOrder: z.string().optional(),
  searchText: z.string().optional(),
})
type GameQuery = z.infer<typeof gameQuerySchema>

const gameQueryStoreSchema = z.object({
  gameQuery: gameQuerySchema,
  setSearchText: z.function().args(z.string()).returns(z.void()),
  setGenreName: z.function().args(z.string()).returns(z.void()),
  setPlatformId: z.function().args(z.number()).returns(z.void()),
  setSortOrder: z.function().args(z.string()).returns(z.void()),
})
type GameQueryStore = z.infer<typeof gameQueryStoreSchema>

export const defineFetchResponseSchema = <T>(resultSchema: z.ZodSchema<T>) =>
  z.object({
    count: z.number(),
    results: z.array(resultSchema),
    next: z.string().nullable().optional(),
    previous: z.string().nullable().optional(),
  });

export type FetchResponse<T> = z.infer<ReturnType<typeof defineFetchResponseSchema<T>>>;

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  games_count: z.number(),
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
  background_image: z.string().nullable().optional(),
  parent_platforms: z.array(z.object({
    platform: platformSchema
  })),
  metacritic: z.number().nullable().optional(),
  rating_top: z.number(),
})

type Game = z.infer<typeof gameSchema>

export const gameDetailSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  rating: z.number(),
  description: z.string(),
  metacritic: z.number().nullable().optional(),
  platforms: z.array(z.object({
    platform: z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string()
    }),
    released_at: z.string().nullable().optional(),
  }))
})

type GameDetail = z.infer<typeof gameDetailSchema>

export type { GameQuery, GameQueryStore, Game, GameDetail, Platform, Genre, Publisher, Screenshot, Trailer }
