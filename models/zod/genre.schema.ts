import { z } from 'zod';

//  Zod Schemas
export const genresResponseSchema = z.array(z.string().min(1));

// Inferred Types
export type Genre = string;
export type GenresResponse = z.infer<typeof genresResponseSchema>;