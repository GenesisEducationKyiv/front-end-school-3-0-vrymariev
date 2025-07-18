'use client';
import qs from 'qs';
import { trackSchema } from '@models/zod/track.schema';
import {
	trackListResponseSchema,
	tracksRequestQueryParamsSchema,
	TrackFormValues,
	TracksRequestQueryParams,
	trackFormValueSchema,
} from '@models/zod/track.table.schema';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { BaseResourceError } from '@models/errors/baseResourceError';
import { err, ok } from 'neverthrow';
import apiClient from '@api/infrastructure/rest/apiClient';

export const fetchTracks = async (query?: TracksRequestQueryParams) => {
	try {
		const validatedQuery = tracksRequestQueryParamsSchema.parse(query ?? {});
		const queryString = qs.stringify(validatedQuery, { encode: true });

		const response = await apiClient.get(`/api/tracks?${queryString}`);

		const result = trackListResponseSchema.safeParse(response.data);
		if (!result.success) {
			return err(
				ApplicationError.wrap(new Error(BaseResourceError.InvalidResponse), BaseResourceError.InvalidResponse),
			);
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const updateTrack = async (id: string, trackData: TrackFormValues) => {
	try {
		const validatedData = trackFormValueSchema.parse(trackData);

		const response = await apiClient.put(`/api/tracks/${id}`, validatedData);

		const result = trackSchema.safeParse(response.data);
		if (!result.success) {
			console.error(result.error);
			return err(ApplicationError.wrap(new Error('Invalid updated track'), BaseResourceError.InvalidResponse));
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const createTrack = async (trackData: TrackFormValues) => {
	try {
		const validatedData = trackFormValueSchema.parse(trackData);
		const response = await apiClient.post('/api/tracks', validatedData);

		const result = trackSchema.safeParse(response.data);
		if (!result.success) {
			return err(
				ApplicationError.wrap(new Error(BaseResourceError.InvalidResponse), BaseResourceError.InvalidResponse),
			);
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const deleteTrack = async (id: string) => {
	try {
		await apiClient.delete(`/api/tracks/${id}`);
		return ok(undefined);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const deleteTrackFile = async (id: string) => {
	try {
		await apiClient.delete(`/api/tracks/${id}/file`);
		return ok(undefined);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const uploadTrackFile = async (id: string, file: FormData) => {
	try {
		await apiClient.post(`/api/tracks/${id}/upload`, file, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return ok(undefined);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};
