import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/api-client";
import { CACHE_KEY_GAMES } from "../services/constants";
import useGameQueryStore from "../store";
import { FetchResponse, Game, gameSchema } from "../validation/validate";

// Initialize the API client
const apiClient = new APIClient<Game>("/games", gameSchema);

const useGames = () => {
    ;
    // to make sure this properly reflects game filters
    const gameQuery = useGameQueryStore((s) => s.gameQuery);

    return useInfiniteQuery<FetchResponse<Game>, Error>({
        // The cache key changes when gameQuery changes
        queryKey: [CACHE_KEY_GAMES, gameQuery],
        queryFn: async ({ pageParam = 1 }) => {
            console.log("Fetching games with:", {
                genreId: gameQuery.genreId,
                platformId: gameQuery.platformId,
                sortOrder: gameQuery.sortOrder,
                searchText: gameQuery.searchText,
                page: pageParam
            });
            const params = {
                genres: gameQuery.genreId || undefined,
                parent_platforms: gameQuery.platformId || undefined,
                ordering: gameQuery.sortOrder || undefined,
                search: gameQuery.searchText || undefined,
                page: pageParam
            };

            console.log("Fetching games with:", params);

            return apiClient.getAll({ params });
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: ms("24h"), // This means the data stays fresh for 24 hours
    });
};

export default useGames;