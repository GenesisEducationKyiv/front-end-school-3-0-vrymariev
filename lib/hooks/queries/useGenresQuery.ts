'use client';
import { fetchGenres } from '@api/resources/genreRest';
import { useQuery } from '@tanstack/react-query';
import { BaseResourceError } from '@models/errors/baseResourceError';
import { API_STRATEGY } from '@lib/config/apiConfig';
import { ApiStrategy } from '@lib/constants/apiStrategy';
import { fetchGenresGrpc } from '@api/resources/genreGrpc';

export const useGenresQuery = () =>
	useQuery({
		queryKey: ['genres'],
		queryFn: async () => {
			const result = API_STRATEGY === ApiStrategy.REST ? await fetchGenres() : await fetchGenresGrpc();

			if (result.isErr()) {
				const error = result.error;

				if (error.is(BaseResourceError.InvalidResponse)) {
					console.error('Invalid schema from server:', error);
				} else if (error.is(BaseResourceError.NetworkError)) {
					console.error('Network issue while fetching genres:', error);
				} else {
					console.error('Unknown error while fetching genres:', error);
				}

				throw error;
			}

			return result.value;
		},
	});
