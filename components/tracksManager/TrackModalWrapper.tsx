'use client';
import dynamic from 'next/dynamic';

const TrackModal = dynamic(() => import('@components/tracksManager/TrackModal'), { ssr: false });


export const TrackModalWrapper = () => {
  return <TrackModal />;
};