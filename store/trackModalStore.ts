import { create } from 'zustand';
import { Track } from '@models/zod/track.schema';

interface TrackModalState {
	modalState?: Track;
	isOpen: boolean;
	openModal: (track?: Track) => void;
	closeModal: () => void;
}

export const useTrackModalStore = create<TrackModalState>((set) => ({
	modalState: undefined,
	isOpen: false,
	openModal: (track) => set({ isOpen: true, modalState: track }),
	closeModal: () => set({ isOpen: false, modalState: undefined }),
}));
