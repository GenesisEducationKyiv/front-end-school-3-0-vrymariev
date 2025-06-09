import apiClient from '../apiClient';
import qs from 'qs';
import {
	trackSchema,
	trackListResponseSchema,
	tracksRequestQueryParamsSchema,
	Track,
	TrackFormValues,
	TrackListResponse,
	TracksRequestQueryParams,
	trackFormValueSchema,
} from '@models/zod/track.schema';
import * as Belt from '@mobily/ts-belt';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { BaseResourceErrorType } from '@models/errors/baseResourceError';

export const fetchTracks = async (
	query?: TracksRequestQueryParams,
): Promise<Belt.Result<TrackListResponse, ApplicationError<BaseResourceErrorType>>> => {
	try {
		const validatedQuery = tracksRequestQueryParamsSchema.parse(query ?? {});
		const queryString = qs.stringify(validatedQuery, { encode: true });

		const response = await apiClient.get(`/api/tracks?${queryString}`);
		const result = trackListResponseSchema.safeParse(response.data);

		if (!result.success) {
			return Belt.R.Error(
				ApplicationError.wrap(new Error(BaseResourceErrorType.InvalidResponse), BaseResourceErrorType.InvalidResponse),
			);
		}

		return Belt.R.Ok(result.data);
	} catch (error) {
		return Belt.R.Error(ApplicationError.wrap(error, BaseResourceErrorType.NetworkError));
	}
};

export const updateTrack = async (id: string, trackData: TrackFormValues): Promise<Track> => {
	const validatedData = trackFormValueSchema.parse(trackData);
	const response = await apiClient.put(`/api/tracks/${id}`, validatedData);

	const result = trackSchema.safeParse(response.data);
	if (!result.success) {
		console.error(result.error);
		throw new Error('Invalid updated track');
	}

	return result.data;
};

export const createTrack = async (trackData: TrackFormValues): Promise<Track> => {
	const validatedData = trackFormValueSchema.parse(trackData);
	const response = await apiClient.post('/api/tracks', validatedData);

	const result = trackSchema.safeParse(response.data);
	if (!result.success) {
		console.error(result.error);
		throw new Error('Invalid track from server');
	}

	return result.data;
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
