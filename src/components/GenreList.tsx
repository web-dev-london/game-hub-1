import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";



const GenreList = () => {
  const { data, error, isFetching } = useGenres();
  const selectedGenreSlug = useGameQueryStore(s => s.gameQuery.genreSlug);
  const setSelectedGenreSlug = useGameQueryStore(s => s.setGenreSlug);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (error) return null;

  const handleGenreClick = (genre: string) => {
    setSelectedGenreSlug(genre);
    const params = new URLSearchParams(searchParams);
    params.set("genre", genre);
    navigate(`?${params.toString().toLowerCase()}`);
  };


  const loadingSkeletons = isFetching &&
    skeletons.map((skeleton) => (
      <ListItem key={skeleton} paddingY="5px">
        <HStack>
          <SkeletonCircle size='10' />
          <Skeleton height="16px" width="60px" />
        </HStack>
      </ListItem>
    ))


  const listOfGenres = data?.results.map((genre) => (
    <ListItem key={genre.id} paddingY="5px">
      <HStack>
        <Image
          boxSize="32px"
          borderRadius={8}
          objectFit="cover"
          src={getCroppedImageUrl(genre.image_background)}
        />
        <Button
          whiteSpace="normal"
          textAlign="left"
          fontWeight={genre.name === selectedGenreSlug ? "bold" : "normal"}
          onClick={() => handleGenreClick(genre.slug)}
          fontSize="md"
          variant="link"
        >
          {genre.name}
        </Button>
      </HStack>
    </ListItem>
  ))


  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {loadingSkeletons}
        {listOfGenres}
      </List>
    </>
  );
};



export default GenreList;