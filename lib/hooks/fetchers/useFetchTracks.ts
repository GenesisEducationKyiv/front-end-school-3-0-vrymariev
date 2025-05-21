import { fetchTracks } from '@api/resources/Tracks';
import { TrackListResponse } from '@models/track/trackListResponse';
import { TracksRequestQueryParams } from '@models/track/tracksRequestQueryParams';
import { useQuery } from '@tanstack/react-query';

export const useTracks = (filters: TracksRequestQueryParams) =>
	useQuery<TrackListResponse>({
		queryKey: ['tracks', filters],
		queryFn: () => fetchTracks(filters),
	});