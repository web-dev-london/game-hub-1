
import { create } from "zustand";
import { GameQueryStore } from "./validation/validate";


const useGameQueryStore = create<GameQueryStore>(set => ({
  gameQuery: {},
  setSearchText: (searchText: string) => set(() => ({ gameQuery: { searchText } })),
  setGenreName: (genreName: string) => set(genre => ({ gameQuery: { ...genre.gameQuery, genreName } })),
  setPlatformId: (platformId: number) => set(platform => ({ gameQuery: { ...platform.gameQuery, platformId } })),
  setSortOrder: (sortOrder: string) => set(sort => ({ gameQuery: { ...sort.gameQuery, sortOrder } })),
}))

export default useGameQueryStore;