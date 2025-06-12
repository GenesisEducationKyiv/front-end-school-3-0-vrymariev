'use client';
import { fetchGenres } from '@api/resources/Genres';
import { useQuery } from '@tanstack/react-query';
import { BaseResourceError, BaseResourceErrorType } from '@models/errors/baseResourceError';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { Result } from 'neverthrow';

export const useGenres = () =>
	useQuery({
		queryKey: ['genres'],
		queryFn: async () => {
			const result: Result<string[], ApplicationError<BaseResourceErrorType>> = await fetchGenres();

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
