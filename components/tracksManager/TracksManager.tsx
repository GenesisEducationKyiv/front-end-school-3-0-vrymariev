import ActiveTrack from '@components/tracksManager/ActiveTrack';
import { CreateNewTrackButton } from '@components/tracksManager/CreateNewTrackButton';
import { TrackListWrapper } from './tacksList/TrackListWrapper';
import { TrackModalWrapper } from './TrackModalWrapper';


export const TracksManager: React.FC = () => {
	return (
		<div className="max-w-400 mx-auto">
			<h1 className="font-semibold text-4xl mt-10 mb-5 " data-testid="tracks-header">
				Tracks manager
			</h1>
			<div className="flex items-center justify-between mb-3">
				<CreateNewTrackButton />
				<div className="flex justify-center flex-1">
					<ActiveTrack />
				</div>
			</div>
			<TrackListWrapper />
			<TrackModalWrapper />
		</div>
	);
};
