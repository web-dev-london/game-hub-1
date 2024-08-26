

import { SimpleGrid, Text } from '@chakra-ui/react'
import { Game } from '../entities/Game'
import CriticScore from './CriticScore'
import DefinitionItem from './DefinitionItem'

const GameAttributes = (props: {
    game: Game
}) => {
    const { game } = props

    return (
        <>
            <SimpleGrid columns={2} as='dl'>
                <DefinitionItem term="Platforms">
                    {game?.parent_platforms?.map(({ platform }) =>
                        <Text key={platform.id}>
                            {platform.name}
                        </Text>)}
                </DefinitionItem>
                <DefinitionItem term="Metacritic">
                    <CriticScore score={game.metacritic} />
                </DefinitionItem>
                <DefinitionItem term="Genres">
                    {props.game.genres?.map(genre => <Text key={genre.id}>{genre.name}</Text>)}
                </DefinitionItem>
                <DefinitionItem term="Publishers">
                    {game.publishers?.map(pub => <Text key={pub.id}>{pub.name}</Text>)}
                </DefinitionItem>
            </SimpleGrid>
        </>
    )
}

export default GameAttributes