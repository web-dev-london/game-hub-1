import useGenres from './useGenres';

const useGenre = (slug?: string) => {
  const { data: genres } = useGenres();
  return genres?.results.find((genre) => genre.slug === slug);
}

export default useGenre;