import { err, ok, Result } from 'neverthrow';
import { ApplicationError } from '@lib/errors/ApplicationError';
import { BaseResourceError } from '@models/errors/baseResourceError';
import { genreClient } from '@api/infrastructure/grpc/clients';
import { genresResponseSchema } from '@models/zod/genre.schema';
import { Empty } from '@api/infrastructure/grpc/gen/music_service_pb';

export const fetchGenresGrpc = async (): Promise<Result<string[], ApplicationError>> => {
	try {
		const response = await genreClient.getAllGenres(Empty);

		const result = genresResponseSchema.safeParse(response.genres);
		if (!result.success) {
			return err(
				ApplicationError.wrap(
					new Error('Invalid gRPC response: fetchGenresGrpc'),
					BaseResourceError.InvalidGrpcResponse,
				),
			);
		}

		return ok(result.data);
	} catch (error) {
		return err(ApplicationError.wrap(error, BaseResourceError.NetworkError));
	}
};
