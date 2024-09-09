import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-client'
import { CACHE_KEY_GAMES_TRAILERS } from '../services/constants';
import { Trailer, trailerSchema } from '../validation/validate';


const useTrailers = (gameId: number) => {
    const apiClient = new APIClient<Trailer>(`/games/${gameId}/movies`, trailerSchema);

    return useQuery({
        queryKey: [CACHE_KEY_GAMES_TRAILERS, gameId],
        queryFn: apiClient.getAll
    })
}

export default useTrailers;
