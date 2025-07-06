import { createClient } from '@connectrpc/connect';
import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { GenreService, TrackService } from '@api/infrastructure/grpc/gen/music_service_connect';

const transport = createGrpcWebTransport({
	baseUrl: 'http://localhost:8080',
});

export const trackClient = createClient(TrackService, transport);
export const genreClient = createClient(GenreService, transport);
