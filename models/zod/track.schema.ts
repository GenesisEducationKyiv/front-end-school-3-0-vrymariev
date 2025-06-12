import { z } from 'zod';

//  Zod Schemas
export const metaSchema = z.object({
	total: z.number(),
	page: z.number(),
	limit: z.number(),
	totalPages: z.number(),
});

export const trackSchema = z.object({
	id: z.string(),
	title: z.string(),
	artist: z.string(),
	album: z.string().optional(),
	genres: z.array(z.string()),
	slug: z.string(),
	coverImage: z.string().optional(),
	audioFile: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

// Inferred Types
export type TrackMeta = z.infer<typeof metaSchema>;
export type Track = z.infer<typeof trackSchema>;