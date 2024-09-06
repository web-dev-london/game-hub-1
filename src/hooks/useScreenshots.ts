import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../services/api-client";
import { Screenshot, screenshotSchema } from "../validation/validate";

const useScreenshots = (gameId: number) => {
    const apiClient = new APIClient<Screenshot>(`/games/${gameId}/screenshots`, screenshotSchema);

    return useQuery({
        queryKey: ["screenshots", gameId],
        queryFn: apiClient.getAll,
        staleTime: ms("24h"), // 24 hours
    })
}

export default useScreenshots;