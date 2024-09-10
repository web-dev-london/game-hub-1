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
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";



const GenreList = () => {
    const { data, error, isFetching } = useGenres();
    const selectedGenreId = useGameQueryStore(s => s.gameQuery.genreId);
    const setSelectedGenreId = useGameQueryStore(s => s.setGenreId);
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (error) return null;


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
                    fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                    onClick={() => setSelectedGenreId(genre.id)}
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
