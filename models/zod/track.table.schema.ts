import { z } from 'zod';
import { metaSchema, trackSchema } from './track.schema';

//  Zod Schemas
export const trackListResponseSchema = z.object({
	data: z.array(trackSchema),
	meta: metaSchema,
});

export const tracksTableSortingSchema = z.union([
	z.literal('title'),
	z.literal('artist'),
	z.literal('album'),
	z.literal('createdAt'),
]);
export const tracksTableOrderSchema = z.union([z.literal('asc'), z.literal('desc')]);
export const tracksTablePageSchema = z.coerce.number().int().positive();
export const tracksTableMetaSchema = z.object({
	search: z.string().trim().optional(),
	genre: z.string().trim().optional(),
	artist: z.string().trim().optional(),
});

export const tracksRequestQueryParamsSchema = z
	.object({
		page: tracksTablePageSchema.optional(),
		limit: z.coerce.number().int().positive().optional(),
		sort: tracksTableSortingSchema.optional(),
		order: tracksTableOrderSchema.optional(),
	})
	.merge(tracksTableMetaSchema);

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
export type TrackListResponse = z.infer<typeof trackListResponseSchema>;
export type TracksRequestQueryParams = z.infer<typeof tracksRequestQueryParamsSchema>;
export type TrackFormValues = z.infer<typeof trackFormValueSchema>;
export type TracksTableSorting = z.infer<typeof tracksTableSortingSchema>;
export type TracksTableOrder = z.infer<typeof tracksTableOrderSchema>;
export type TracksTablePage = z.infer<typeof tracksTablePageSchema>;
export type TracksTableMeta = z.infer<typeof tracksTableMetaSchema>;
