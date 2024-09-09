
import { create } from "zustand";
import { GameQueryStore } from "./validation/validate";


const useGameQueryStore = create<GameQueryStore>(set => ({
    gameQuery: {},
    setSearchText: (searchText: string) => set(() => ({ gameQuery: { searchText } })),
    setGenreId: (genreId: number) => set(genre => ({ gameQuery: { ...genre.gameQuery, genreId } })),
    setPlatformId: (platformId: number) => set(platform => ({ gameQuery: { ...platform.gameQuery, platformId } })),
    setSortOrder: (sortOrder: string) => set(sort => ({ gameQuery: { ...sort.gameQuery, sortOrder } })),
}))

export default useGameQueryStore;