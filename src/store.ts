
import { create } from "zustand";
import { GameQueryStore } from "./validation/validate";


const useGameQueryStore = create<GameQueryStore>(set => ({
  gameQuery: {},
  setSearchText: (searchText: string) => set(() => ({ gameQuery: { searchText } })),
  setGenreSlug: (genreSlug: string) => set(genre => ({ gameQuery: { ...genre.gameQuery, genreSlug } })),
  setPlatformId: (platformId: number) => set(platform => ({ gameQuery: { ...platform.gameQuery, platformId: platformId } })),
  setSortOrder: (sortOrder: string) => set(sort => ({ gameQuery: { ...sort.gameQuery, sortOrder } })),
}))

export default useGameQueryStore;