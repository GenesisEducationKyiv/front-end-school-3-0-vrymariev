'use client';
import { fetchTracks } from '@api/resources/trackRest';
import { TracksRequestQueryParams } from '@models/zod/track.table.schema';
import { useQuery } from '@tanstack/react-query';
import { BaseResourceError } from '@models/errors/baseResourceError';
import { API_STRATEGY } from '@lib/config/apiConfig';
import { ApiStrategy } from '@lib/constants/apiStrategy';
import { trackClient } from '@api/infrastructure/grpc/clients';
import { fetchTracksGrpc } from '@api/resources/trackGrpc';

export const useTracks = (filters: TracksRequestQueryParams) =>
	useQuery({
		queryKey: ['tracks', filters],
		queryFn: async () => {
			await trackClient.listTracks(filters);
			const result = API_STRATEGY === ApiStrategy.REST ? await fetchTracks(filters) : await fetchTracksGrpc(filters);

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
