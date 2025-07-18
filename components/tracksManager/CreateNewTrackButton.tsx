'use client';
import { Button } from '@ui/Button';
import { Plus } from 'lucide-react';
import { useTrackModalStore } from '@store/trackModalStore';

export const CreateNewTrackButton: React.FC = () => {
	const { openModal } = useTrackModalStore();

	return (
		<Button
			onClick={() => openModal()}
			className="flex items-center gap-2 cursor-pointer"
			data-testid="create-track-button"
		>
			<Plus className="w-4 h-4" />
			Create new track
		</Button>
	);
};
