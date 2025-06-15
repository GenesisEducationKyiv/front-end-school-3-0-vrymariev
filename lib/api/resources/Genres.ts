import apiClient from '@api/apiClient';
import { genresResponseSchema } from '@models/zod/genre.schema';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { BaseResourceError, BaseResourceErrorType } from '@models/errors/baseResourceError';
import { err, ok } from 'neverthrow';

export const fetchGenres = async () => {
	try {
		const response = await apiClient.get('/api/genres');
		const result = genresResponseSchema.safeParse(response.data);

		if (!result.success) {
			return err(ApplicationError.wrap(new Error('Invalid response'), BaseResourceError.InvalidResponse));
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};
