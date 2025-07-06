import { deleteTrackFileGrpc } from '@api/resources/trackGrpc';
import { deleteTrackFile } from '@api/resources/trackRest';
import { API_STRATEGY } from '@lib/config/apiConfig';
import { ApiStrategy } from '@lib/constants/apiStrategy';
import { tryCatch } from '@lib/utils/neverthrowUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type DeleteTrackFileParams = {
	id: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
};

export function useDeleteTrackFile({ id, onSuccess, onError }: DeleteTrackFileParams) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const result = API_STRATEGY === ApiStrategy.REST ? await deleteTrackFile(id) : await deleteTrackFileGrpc(id);

			if (result.isErr()) throw result.error;
			return result.value;
		},
		onSuccess: async () => {
			const invalidateResult = await tryCatch(() => queryClient.invalidateQueries({ queryKey: ['tracks'] }));
			if (invalidateResult.isErr()) {
				console.warn('Track file deleted, but cache invalidation failed: ', invalidateResult.error);
			}
			onSuccess?.();
		},
		onError: (error) => {
			console.error('Delete track file error:', error);
			onError?.(error);
		},
	});
}
