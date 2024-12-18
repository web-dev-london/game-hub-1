import { useQuery } from '@tanstack/react-query';
import genres from "../data/genres";
import APIClient from "../services/api-client";
import ms from "ms";
import { CACHE_KEY_GENRES } from "../services/constants";
import { Genre } from "../validation/validate";
import { genreSchema } from "../validation/validate";

const apiClient = new APIClient<Genre>("/genres", genreSchema);

const useGenres = () => useQuery({
    queryKey: [CACHE_KEY_GENRES],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24 hours
    initialData: genres,
})

export default useGenres;