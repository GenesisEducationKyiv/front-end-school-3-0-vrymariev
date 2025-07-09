'use client';
import { useEffect, useState } from 'react';
import { trackClient } from '@api/infrastructure/grpc/clients';
import { startActiveTrackStream } from '@api/resources/trackGrpc';

const ActiveTrack: React.FC = () => {
	const [trackName, setTrackName] = useState<string>('');

	useEffect(() => {
		const abort = startActiveTrackStream((title) => {
			setTrackName(title);
		});

		return () => {
			abort.abort();
		};
	}, []);

	return (
		<div className="px-4 py-3 bg-gray-50 rounded-xl shadow-md flex flex-col items-center max-w-xs">
			<p className="text-sm text-gray-500 italic mb-1">Now playing: most listened track</p>
			<p className="text-lg font-semibold text-gray-800">{trackName || 'No track playing'}</p>
		</div>
	);
};

export default ActiveTrack;
