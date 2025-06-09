import { fetchTracks } from '@api/resources/Tracks';
import { TrackListResponse, TracksRequestQueryParams } from '@models/zod/track.schema';
import { useQuery } from '@tanstack/react-query';
import * as Belt from '@mobily/ts-belt';
import { BaseResourceErrorType } from '@models/errors/baseResourceError';

export const useTracks = (filters: TracksRequestQueryParams) =>
	useQuery<TrackListResponse>({
		queryKey: ['tracks', filters],
		queryFn: async () => {
			const result = await fetchTracks(filters);
			Belt.R.tapError(result, (error) => {
				if (error.is(BaseResourceErrorType.InvalidResponse)) {
					console.error('Invalid schema from server:', error);
				}

				if (error.is(BaseResourceErrorType.NetworkError)) {
					console.error('Network issue while fetching tracks:', error);
				}

				console.error('Unknown error while fetching tracks:', error);

				throw error;
			});

			return Belt.R.getExn(result);
		},
	});