import { TracksRequestQueryParams } from '@models/track/tracksRequestQueryParams';
import apiClient from '../apiClient';
import qs from 'qs';
import { TrackListResponse } from '@models/track/trackListResponse';
import { Track } from '@models/track/track';

export const fetchTracks = async (query?: TracksRequestQueryParams): Promise<TrackListResponse> => {
	const queryString = query ? qs.stringify(query, { encode: true }) : '';

	const response = await apiClient.get<TrackListResponse>(`/api/tracks?${queryString}`);
	return response.data;
};

export const updateTrack = async (
	id: string,
	trackData: {
		title: string;
		artist: string;
		album?: string;
		genres: string[];
		coverImage?: string;
	},
): Promise<Track> => {
	const response = await apiClient.put<Track>(`/api/tracks/${id}`, trackData);
	return response.data;
};

export const createTrack = async (trackData: {
	title: string;
	artist: string;
	album?: string;
	genres: string[];
	coverImage?: string;
}): Promise<Track> => {
	const response = await apiClient.post<Track>('/api/tracks', trackData);
	return response.data;
};

export const deleteTrack = async (id: string): Promise<void> => {
	await apiClient.delete(`/api/tracks/${id}`);
};

export const deleteTrackFile = async (id: string): Promise<void> => {
	await apiClient.delete(`/api/tracks/${id}/file`);
};

export const uploadTrackFile = async (id: string, file: FormData): Promise<void> => {
	await apiClient.post(`/api/tracks/${id}/upload`, file, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};
