
import { create } from "zustand";

interface GameQuery {
    genreId?: number;
    platformId?: number;
    sortOrder?: string;
    searchText?: string;
}

interface GameQueryStore {
    gameQuery: GameQuery;
    setSearchText: (searchText: string) => void;
    setGenreId: (genreId: number) => void;
    setPlatformId: (platformId: number) => void;
    setSortOrder: (sortOrder: string) => void;
}

const useGameQueryStore = create<GameQueryStore>(set => ({
    gameQuery: {},
    setSearchText: (searchText: string) => set({ gameQuery: { searchText } }),
    setGenreId: (genreId: number) => set(genre => ({ gameQuery: { ...genre.gameQuery, genreId } })),
    setPlatformId: (platformId: number) => set(platform => ({ gameQuery: { ...platform.gameQuery, platformId } })),
    setSortOrder: (sortOrder: string) => set(sort => ({ gameQuery: { ...sort.gameQuery, sortOrder } })),
}))

export default useGameQueryStore;