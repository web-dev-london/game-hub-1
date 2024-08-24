import { Heading } from '@chakra-ui/react'
import { GameQuery } from '../App'
import useGenres from '../hooks/useGenres'
import usePlatforms from '../hooks/usePlatforms'

interface Props {
    gameQuery: GameQuery
}

const GameHeading = ({ gameQuery }: Props) => {
    const { data: genres } = useGenres();
    const { data: platforms } = usePlatforms();

    const platform = platforms?.results.find((platform) => platform.id === gameQuery.platformId);

    const genre = genres?.results.find((genre) => genre.id === gameQuery.genreId);

    const heading = `${gameQuery.platformId && platform?.name || ''} ${gameQuery.genreId && genre?.name || ''} Games`;

    return (
        <Heading as='h1' marginY={5} fontSize='5xl'>{heading}</Heading>
    )
}

export default GameHeading