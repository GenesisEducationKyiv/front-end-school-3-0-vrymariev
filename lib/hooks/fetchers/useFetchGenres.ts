import { fetchGenres } from '@api/resources/Genres';
import { useQuery } from '@tanstack/react-query';
import * as Belt from '@mobily/ts-belt';
import { BaseResourceErrorType } from '@models/errors/baseResourceError';
import { GenresResponse } from '@models/zod/genre.schema';

export const useGenres = () =>
	useQuery<GenresResponse>({
		queryKey: ['genres'],
		queryFn: async () => {
			const result = await fetchGenres();

			if (Belt.R.isOk(result)) {
				return Belt.R.getExn(result);
			}

			Belt.R.tapError(result, (error) => {
				if (error.is(BaseResourceErrorType.InvalidResponse)) {
					console.error('Invalid schema from server:', error);
					return;
				}

				if (error.is(BaseResourceErrorType.NetworkError)) {
					console.error('Network issue while fetching genres:', error);
					return;
				}

				console.error('Unknown error while fetching tracks:', error);
				throw error;
			});

			return Belt.R.getExn(result);
		},
	});
