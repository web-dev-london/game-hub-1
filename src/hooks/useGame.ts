import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Game, GameDetail, gameDetailSchema } from "../validation/validate";
import { gameSchema } from "../validation/validate";
import { CACHE_KEY_GAMES } from "../services/constants";

const apiClient = new APIClient<GameDetail>(`/games`, gameDetailSchema);

const useGame = (slug: string) => useQuery({
    queryKey: [CACHE_KEY_GAMES, slug],
    queryFn: (() => {
        const response = apiClient.get(slug);
        return response;
    })
})

export default useGame;