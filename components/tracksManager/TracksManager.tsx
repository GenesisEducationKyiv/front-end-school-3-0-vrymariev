'use client';
import { TracksList } from '@components/tracksManager/tacksList/TracksList';
import { Button } from '@ui/Button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTrackModalStore } from '@store/trackModalStore';
import ActiveTrack from './ActiveTrack';

const TrackModal = dynamic(() => import('@components/tracksManager/TrackModal'), { ssr: false });


export const TracksManager: React.FC = () => {
	const { openModal } = useTrackModalStore();

	return (
		<div className="max-w-400 mx-auto">
			<h1 className="font-semibold text-4xl mt-10 mb-5 " data-testid="tracks-header">
				Tracks manager
			</h1>
			<div className="flex items-center justify-between mb-3">
				<Button
					onClick={() => openModal()}
					className="flex items-center gap-2 cursor-pointer"
					data-testid="create-track-button"
				>
					<Plus className="w-4 h-4" />
					Create new track
				</Button>
				<div className="flex justify-center flex-1">
					<ActiveTrack />
				</div>
			</div>
			<TracksList />
			<TrackModal />
		</div>
	);
};
