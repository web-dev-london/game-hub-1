import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-client'
import { Trailer, trailerSchema } from '../validation/validate';


const useTrailers = (gameId: number) => {
    const apiClient = new APIClient<Trailer>(`/games/${gameId}/movies`, trailerSchema);

    return useQuery({
        queryKey: ["trailers", gameId],
        queryFn: apiClient.getAll
    })
}

export default useTrailers;
