import { fetchGenres } from '@api/resources/Genres';
import { useQuery } from '@tanstack/react-query';

export const useGenres = () =>
	useQuery<string[]>({
		queryKey: ['genres'],
		queryFn: fetchGenres,
	});
