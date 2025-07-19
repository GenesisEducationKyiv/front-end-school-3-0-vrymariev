import ActiveTrack from '@components/tracksManager/ActiveTrack';
import { CreateNewTrackButton } from '@components/tracksManager/CreateNewTrackButton';
import { TrackListWrapper } from './tacksList/TrackListWrapper';
import { TrackModalWrapper } from './TrackModalWrapper';

export const TracksManager: React.FC = () => {
	return (
		<div className="max-w-400 mx-auto">
      <div className="bg-primary text-primary-foreground p-4 rounded">
        Це primary колір
      </div>
      <div className="bg-secondary text-secondary-foreground p-4 rounded">
        Це secondary колір
      </div>
      <div className="bg-accent text-accent-foreground p-4 rounded">
        Це accent колір
      </div>
	  <div className="bg-primary text-primary-foreground p-4">Tailwind кольори</div>
<div className="bg-[var(--primary)] text-[var(--primary-foreground)] p-4">CSS змінні</div>
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
