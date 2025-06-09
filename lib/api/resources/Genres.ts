import apiClient from "@api/apiClient";
import { GenresResponse } from "@models/zod/genre.schema";

export const fetchGenres = async (): Promise<GenresResponse> => {
	const response = await apiClient.get<GenresResponse>('/api/genres');
	return response.data;
};
