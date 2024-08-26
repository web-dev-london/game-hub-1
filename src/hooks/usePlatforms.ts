import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";
import APIClient from "../services/api-client";
import { CACHE_KEY_PLATFORMS } from "../services/constants";
import ms from "ms";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}


const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () => useQuery({
    queryKey: CACHE_KEY_PLATFORMS,
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24 hours
    initialData: platforms
})

export default usePlatforms;
