'use client';
import { fetchTracks } from '@api/resources/Tracks';
import { TrackListResponse, TracksRequestQueryParams } from '@models/zod/track.table.schema';
import { useQuery } from '@tanstack/react-query';
import { BaseResourceError, BaseResourceErrorType } from '@models/errors/baseResourceError';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { Result } from 'neverthrow';

export const useTracks = (filters: TracksRequestQueryParams) =>
	useQuery({
		queryKey: ['tracks', filters],
		queryFn: async () => {
			const result: Result<TrackListResponse, ApplicationError<BaseResourceErrorType>> = await fetchTracks(filters);

			if (result.isErr()) {
				const error = result.error;

				if (error.is(BaseResourceError.InvalidResponse)) {
					console.error('Invalid schema from server:', error);
				} else if (error.is(BaseResourceError.NetworkError)) {
					console.error('Network issue while fetching tracks:', error);
				} else {
					console.error('Unknown error while fetching tracks:', error);
				}

				throw error;
			}

			return result.value;
		},
	});
