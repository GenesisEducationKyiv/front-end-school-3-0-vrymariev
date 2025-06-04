'use client';
import { useTrackModal } from '@context/TrackModalContext';
import { Button } from '@ui/Button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@ui/Dialog';
import TrackForm from '@components/tracksManager/TrackForm';
import { createTrack, updateTrack } from '@api/resources/Tracks';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TrackFormValues } from '@models/zod/track.schema';

const TrackModal: React.FC = () => {
	const { isOpen, modalState, closeModal } = useTrackModal();
	const queryClient = useQueryClient();

	const isEdit = !!modalState;

	const handleSubmit = async (data: TrackFormValues) => {
		try {
			if (isEdit) {
				await updateTrack(modalState.id, data);
			} else {
				await createTrack(data);
			}
			await queryClient.invalidateQueries({ queryKey: ['tracks'] });
			toast.success('Success!');
			closeModal();
		} catch (error) {
			console.error('Error on TrackModal: ', error);
			toast.error('Server error! Check console');
		}
	};

	return (
		<div>
			<Dialog open={isOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='mb-3'>{isEdit ? `Edit "${modalState.title}"` : 'Create new track'}</DialogTitle>
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
