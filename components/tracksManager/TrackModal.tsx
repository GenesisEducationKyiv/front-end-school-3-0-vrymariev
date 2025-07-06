'use client';
import { Button } from '@ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/Dialog';
import TrackForm from '@components/tracksManager/TrackForm';
import { toast } from 'sonner';
import { TrackFormValues } from '@models/zod/track.table.schema';
import { useTrackMutation } from '@lib/hooks/mutations/useTrackMutation';
import { tryCatch } from '@lib/utils/neverthrowUtils';
import { useTrackModalStore } from '@store/trackModalStore';

const TrackModal: React.FC = () => {
	const { isOpen, modalState, closeModal } = useTrackModalStore();
	
	const { mutateAsync } = useTrackMutation({
		id: modalState?.id,
		onSuccess: () => {
			toast.success('Success!');
			closeModal();
		},
	});

	const isEdit = !!modalState;

	const handleSubmit = async (data: TrackFormValues) => {
		const mutationResult = await tryCatch(() => mutateAsync(data));
		if (mutationResult.isErr()) {
			toast.error('Failed to save track');
		}
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
