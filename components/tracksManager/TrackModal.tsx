'use client';
import { useTrackModal } from '@context/TrackModalContext';
import { Button } from '@ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog';
import TrackForm from '@components/tracksManager/TrackForm';
import { createTrack, updateTrack } from '@api/resources/Tracks';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TrackFormValues } from '@models/zod/track.schema';
import { tryCatch } from '@lib/neverthrowUtils';

const TrackModal: React.FC = () => {
	const { isOpen, modalState, closeModal } = useTrackModal();
	const queryClient = useQueryClient();

	const isEdit = !!modalState;

	const handleSubmit = async (data: TrackFormValues) => {
		const mutationResult = isEdit
			? await tryCatch(() => updateTrack(modalState.id, data))
			: await tryCatch(() => createTrack(data));

		if (mutationResult.isErr()) {
			console.error('Error on TrackModal:', mutationResult.error);
			toast.error('Failed to save track');
			return;
		}

		const invalidateResult = await tryCatch(() => queryClient.invalidateQueries({ queryKey: ['tracks'] }));

		if (invalidateResult.isErr()) {
			console.warn('Track saved, but refetch failed:', invalidateResult.error);
			toast.warning('Saved, but track list not refreshed');
		}

		toast.success('Success!');
		closeModal();
	};

	return (
		<div>
			<Dialog open={isOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="mb-3">{isEdit ? `Edit "${modalState.title}"` : 'Create new track'}</DialogTitle>
						<TrackForm defaultValues={modalState} onSubmit={handleSubmit} />
						<Button className="cursor-pointer" variant="secondary" onClick={closeModal}>
							Cancel
						</Button>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TrackModal;
