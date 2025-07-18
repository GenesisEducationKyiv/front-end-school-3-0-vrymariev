'use client';
import dynamic from 'next/dynamic';

const TracksList = dynamic(() => import('@components/tracksManager/tacksList/TracksList').then((mod) => mod.TracksList), {
	ssr: true,
	loading: () => <div className="text-gray-500">Loading table...</div>,
});


export const TrackListWrapper = () => {
  return <TracksList />;
};