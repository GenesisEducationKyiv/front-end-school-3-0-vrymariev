'use client';
import { TracksManager } from '@components/tracksManager/TracksManager';
import { Suspense } from 'react';

export default function Tracks() {
	return (
		<div>
			<main>
				<Suspense fallback={<div>Loading...</div>}>
					<TracksManager />
				</Suspense>
			</main>
		</div>
	);
}
