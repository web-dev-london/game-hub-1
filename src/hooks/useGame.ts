import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Game } from "../validation/validate";
import { gameSchema } from "../validation/validate";

const apiClient = new APIClient<Game>(`/games`, gameSchema);

const useGame = (slug: string) => useQuery({
    queryKey: ["games", slug],
    queryFn: (() => {
        const response = apiClient.get(slug);
        return response;
    })
})

export default useGame;