'use client';
import { TracksList } from '@components/tracksManager/tacksList/TracksList';
import TrackModal from './TrackModal';
import { Button } from '@ui/Button';
import { Plus } from 'lucide-react';
import { useTrackModalStore } from '@store/trackModalStore';

export const TracksManager: React.FC = () => {
	const { openModal } = useTrackModalStore();

	return (
		<div className="max-w-400 mx-auto">
			<h1 className="font-semibold text-4xl mt-10 mb-5 " data-testid="tracks-header">
				Tracks manager
			</h1>
			<Button
				onClick={() => openModal()}
				className="flex items-center gap-2 mb-3 cursor-pointer"
				data-testid="create-track-button"
			>
				<Plus className="w-4 h-4" />
				Create new track
			</Button>
			<TracksList />
			<TrackModal />
		</div>
	);
};
