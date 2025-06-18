'use client';
import { TracksManager } from '@components/tracksManager/TracksManager';
import { TrackModalProvider } from '@context/TrackModalContext';

export default function Tracks() {
	return (
		<div>
			<main>
				<TrackModalProvider>
					<TracksManager />
				</TrackModalProvider>
			</main>
		</div>
	);
}
