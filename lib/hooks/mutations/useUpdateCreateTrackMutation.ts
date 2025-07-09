'use client';
import { createTrack, updateTrack } from '@api/resources/trackRest';
import { TrackFormValues } from '@models/zod/track.table.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseResourceError, BaseResourceErrorType } from '@models/errors/baseResourceError';
import { Track } from '@models/zod/track.schema';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { Result } from 'neverthrow';
import { createTrackGrpc, updateTrackGrpc } from '@api/resources/trackGrpc';
import { API_STRATEGY } from '@lib/config/apiConfig';
import { ApiStrategy } from '@lib/constants/apiStrategy';

type UseTrackMutationParams = {
	id?: string;
	onSuccess?: () => void;
	onError?: () => void;
};

export function useUpdateCreateTrackMutation({ id, onSuccess }: UseTrackMutationParams) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: TrackFormValues): Promise<Track> => {
			let result: Result<Track, ApplicationError<BaseResourceErrorType>>;

			if (API_STRATEGY === ApiStrategy.REST) {
				result = id ? await updateTrack(id, data) : await createTrack(data);
			} else {
				result = id ? await updateTrackGrpc(id, data) : await createTrackGrpc(data);
			}

			if (result.isErr()) {
				const error = result.error;

				if (error.is(BaseResourceError.InvalidResponse)) {
					console.error('Invalid schema from server:', error);
				} else if (error.is(BaseResourceError.NetworkError)) {
					console.error('Network issue while saving track:', error);
				} else {
					console.error('Unknown error while saving track:', error);
				}

				throw error;
			}

			return result.value;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tracks'] });
			onSuccess?.();
		},
		onError: (error) => {
			console.error('React Query onError:', error);
		},
	});
}
