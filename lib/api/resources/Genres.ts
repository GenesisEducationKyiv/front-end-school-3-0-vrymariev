import apiClient from "@api/apiClient";

export const fetchGenres = async (): Promise<string[]> => {
	const response = await apiClient.get<string[]>('/api/genres');
	return response.data;
};
