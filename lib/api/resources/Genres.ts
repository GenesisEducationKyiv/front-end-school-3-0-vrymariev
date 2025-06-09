import apiClient from '@api/apiClient';
import { GenresResponse, genresResponseSchema } from '@models/zod/genre.schema';
import * as Belt from '@mobily/ts-belt';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { BaseResourceErrorType } from '@models/errors/baseResourceError';

export const fetchGenres = async (): Promise<
	Belt.Result<GenresResponse, ApplicationError<BaseResourceErrorType>>
> => {
	try {
		const response = await apiClient.get('/api/genres');
		const result = genresResponseSchema.safeParse(response.data);

		if (!result.success) {
			return Belt.R.Error(ApplicationError.wrap(new Error('Invalid response'), BaseResourceErrorType.InvalidResponse));
		}

		return Belt.R.Ok(result.data);
	} catch (error) {
		return Belt.R.Error(ApplicationError.wrap(error, BaseResourceErrorType.NetworkError));
	}
};
