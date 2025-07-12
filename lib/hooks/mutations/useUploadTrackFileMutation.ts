import { uploadTrackFile } from '@api/resources/trackRest';
import { tryCatch } from '@lib/utils/neverthrowUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';


type UploadTrackFileParams = {
	id: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
};


export function useUploadTrackFileMutation({ id, onSuccess, onError }: UploadTrackFileParams) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (file: FormData) =>
			uploadTrackFile(id, file).then((result) => {
				if (result.isErr()) throw result.error;
				return result.value;
			}),
		onSuccess: async () => {
			const invalidateResult = await tryCatch(() => queryClient.invalidateQueries({ queryKey: ['tracks'] }));
			if (invalidateResult.isErr()) {
				console.warn('Track file uploaded, but cache invalidation failed: ', invalidateResult.error);
			}
			onSuccess?.();
		},
		onError: (error) => {
			console.error('Upload track file error:', error);
			onError?.(error);
		},
	});
}
