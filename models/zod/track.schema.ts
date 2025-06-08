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

export const trackListResponseSchema = z.object({
	data: z.array(trackSchema),
	meta: metaSchema,
});

export const tracksRequestSortingSchema = z.union([z.literal('title'), z.literal('artist')]);

export const tracksRequestQueryParamsSchema = z.object({
	page: z.coerce.number().int().positive().optional(),
	limit: z.coerce.number().int().positive().optional(),
	search: z.string().trim().optional(),
	genre: z.string().trim().optional(),
	artist: z.string().trim().optional(),
	sort: tracksRequestSortingSchema.optional(),
	order: z.union([z.literal('asc'), z.literal('desc')]).optional(),
});

export const trackFormValueSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	artist: z.string().min(1, 'Artist is required'),
	album: z.string().optional(),
	genres: z.array(z.string()).min(1, 'At least one genre is required'),
	coverImage: z
		.string()
		.refine((val) => val === '' || /^https?:\/\/\S+\.\S+/.test(val), {
			message: 'Must be a valid URL',
		})
		.optional(),
});

// Inferred Types
export type TrackMeta = z.infer<typeof metaSchema>;
export type Track = z.infer<typeof trackSchema>;
export type TrackListResponse = z.infer<typeof trackListResponseSchema>;
export type TracksRequestQueryParams = z.infer<typeof tracksRequestQueryParamsSchema>;
export type TrackFormValues = z.infer<typeof trackFormValueSchema>;
export type TracksRequestSorting = z.infer<typeof tracksRequestSortingSchema>;