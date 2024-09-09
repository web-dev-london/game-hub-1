import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import platforms from "../data/platforms";
import APIClient from "../services/api-client";
import { CACHE_KEY_PLATFORMS } from "../services/constants";
import { Platform, platformSchema } from "../validation/validate";

const apiClient = new APIClient<Platform>("/platforms", platformSchema);

const usePlatforms = () => useQuery({
    queryKey: [CACHE_KEY_PLATFORMS],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24 hours
    initialData: platforms,
})

export default usePlatforms;
