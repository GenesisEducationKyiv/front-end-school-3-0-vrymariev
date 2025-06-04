import { fetchTracks } from '@api/resources/Tracks';
import { TrackListResponse, TracksRequestQueryParams } from '@models/zod/track.schema';
import { useQuery } from '@tanstack/react-query';

export const useTracks = (filters: TracksRequestQueryParams) =>
	useQuery<TrackListResponse>({
		queryKey: ['tracks', filters],
		queryFn: () => fetchTracks(filters),
	});