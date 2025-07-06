import { deleteTrackGrpc } from '@api/resources/trackGrpc';
import { deleteTrack } from '@api/resources/trackRest';
import { API_STRATEGY } from '@lib/config/apiConfig';
import { ApiStrategy } from '@lib/constants/apiStrategy';
import { tryCatch } from '@lib/utils/neverthrowUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type DeleteTrackParams = {
	id?: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
};

export function useDeleteTrack({ onSuccess, onError }: DeleteTrackParams) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const result = API_STRATEGY === ApiStrategy.REST ? await deleteTrack(id) : await deleteTrackGrpc(id);

			if (result.isErr()) throw result.error;
			return result.value;
		},
		onSuccess: async () => {
			const invalidateResult = await tryCatch(() => queryClient.invalidateQueries({ queryKey: ['tracks'] }));
			if (invalidateResult.isErr()) {
				console.warn('Track deleted, but cache invalidation failed: ', invalidateResult.error);
			}
			onSuccess?.();
		},
		onError: (error) => {
			console.error('Delete track error:', error);
			onError?.(error);
		},
	});
}
