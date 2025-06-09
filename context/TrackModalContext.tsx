import { Track } from '@models/zod/track.schema';
import React, { createContext, useContext, useState } from 'react';

type TrackModalContextType = {
	modalState?: Track;
	isOpen: boolean;
	openModal: (state?: Track) => void;
	closeModal: () => void;
};

export const TrackModalContext = createContext<TrackModalContextType | undefined>(undefined);

export const TrackModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [modalState, setModalState] = useState<Track | undefined>();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = (state?: Track) => {
		setIsOpen(true);
		setModalState(state);
	};

	const closeModal = () => {
		setIsOpen(false);
		setModalState(undefined);
	};

	return (
		<TrackModalContext.Provider value={{ modalState, isOpen, openModal, closeModal }}>
			{children}
		</TrackModalContext.Provider>
	);
};

export const useTrackModal = () => {
	const context = useContext(TrackModalContext);
	if (!context) throw new Error('useTrackModal must be used within TrackModalProvider');
	return context;
};
