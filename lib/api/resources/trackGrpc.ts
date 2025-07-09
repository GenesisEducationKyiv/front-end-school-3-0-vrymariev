import { err, ok, Result } from 'neverthrow';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { BaseResourceError } from '@models/errors/baseResourceError';
import { trackClient } from '@api/infrastructure/grpc/clients';
import {
	trackListResponseSchema,
	tracksRequestQueryParamsSchema,
	TrackFormValues,
	TracksRequestQueryParams,
	trackFormValueSchema,
} from '@models/zod/track.table.schema';
import { trackSchema } from '@models/zod/track.schema';

export const fetchTracksGrpc = async (query?: TracksRequestQueryParams): Promise<Result<any, ApplicationError>> => {
	try {
		const validatedQuery = tracksRequestQueryParamsSchema.parse(query ?? {});
		const response = await trackClient.listTracks(validatedQuery);

		const result = trackListResponseSchema.safeParse(response);
		if (!result.success) {
			return err(
				ApplicationError.wrap(
					new Error('Invalid gRPC response: fetchTracksGrpc'),
					BaseResourceError.InvalidGrpcResponse,
				),
			);
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const updateTrackGrpc = async (id: string, trackData: TrackFormValues) => {
	try {
		const validatedData = trackFormValueSchema.parse(trackData);
		const response = await trackClient.updateTrack({ id, ...validatedData });

		const result = trackSchema.safeParse(response);
		if (!result.success) {
			console.error(result.error);
			return err(
				ApplicationError.wrap(
					new Error('Invalid gRPC response: updateTrackGrpc'),
					BaseResourceError.InvalidGrpcResponse,
				),
			);
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const createTrackGrpc = async (trackData: TrackFormValues) => {
	try {
		const validatedData = trackFormValueSchema.parse(trackData);
		const response = await trackClient.addTrack(validatedData);

		const result = trackSchema.safeParse(response);
		if (!result.success) {
			return err(
				ApplicationError.wrap(
					new Error('Invalid gRPC response: createTrackGrpc'),
					BaseResourceError.InvalidGrpcResponse,
				),
			);
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const deleteTrackGrpc = async (id: string) => {
	try {
		await trackClient.deleteTrack({ id });
		return ok(undefined);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const deleteTrackFileGrpc = async (id: string) => {
	try {
		await trackClient.deleteTrackFile({ file: id });

		return ok(undefined);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const uploadTrackFileGrpc = async (id: string, file: FormData) => {
	try {
		const fileEntry = file.get('file');
		if (!(fileEntry instanceof File)) {
			throw new Error('FormData does not contain a file named "file"');
		}
		const arrayBuffer = await fileEntry.arrayBuffer();
		await trackClient.uploadTrackFile({ file: new Uint8Array(arrayBuffer), filename: id });

		return ok(undefined);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};

export const startActiveTrackStream = (onMessage: (title: string) => void): AbortController => {
	const abort = new AbortController();

	(async () => {
		try {
			const stream = trackClient.activeTrackStream({}, { signal: abort.signal });
			for await (const message of stream) {
				onMessage(message.title);
			}
		} catch (err) {
			console.error('Stream error:', err);
		}
	})();

	return abort;
};