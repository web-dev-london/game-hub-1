import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";
import apiClient from "../services/api-client";
import { FetchResponse } from "../services/api-client";

interface Platform {
    id: number;
    name: string;
    slug: string;
}

const usePlatforms = () => useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
        const response = await apiClient.get<FetchResponse<Platform>>("/platforms/lists/parents");
        return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialData: { count: platforms.length, results: platforms }
})

export default usePlatforms;
