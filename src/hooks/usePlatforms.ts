import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";
import ms from "ms";
import APIClient from "../services/api-client";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}


const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () => useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.get,
    staleTime: ms("24h"), // 24 hours
    initialData: platforms
})

export default usePlatforms;
