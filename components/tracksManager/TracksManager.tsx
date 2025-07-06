'use client';
import { TracksList } from '@components/tracksManager/tacksList/TracksList';
import { useTrackModal } from '@context/TrackModalContext';
import { Button } from '@ui/Button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

const TrackModal = dynamic(() => import('@components/tracksManager/TrackModal'), { ssr: false });

export const TracksManager: React.FC = () => {
	const { openModal } = useTrackModal();

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
