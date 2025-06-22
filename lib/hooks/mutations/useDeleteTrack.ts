import { deleteTrack } from '@api/resources/Tracks';
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
			const result = await deleteTrack(id);
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
