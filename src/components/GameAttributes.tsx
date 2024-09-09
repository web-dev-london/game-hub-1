

import { SimpleGrid, Text } from '@chakra-ui/react'
import { Game, GameDetail } from '../validation/validate'
import CriticScore from './CriticScore'
import DefinitionItem from './DefinitionItem'

const GameAttributes = (props: {
    game: GameDetail
}) => {
    const { game } = props

    return (
        <>
            <SimpleGrid columns={2} as='dl'>
                <DefinitionItem term="Platforms">
                    {game?.platforms?.map(({ platform }) =>
                        <Text key={platform.id}>
                            {platform.name}
                        </Text>)}
                </DefinitionItem>
                <DefinitionItem term="Metacritic">
                    <CriticScore score={game.metacritic!} />
                </DefinitionItem>
                <DefinitionItem term="Release">
                    <Text fontWeight={'bold'}>{game.platforms?.[0].released_at}</Text>
                </DefinitionItem>
                <DefinitionItem term="Rating">
                    <Text fontWeight={'bold'} color={'yellow.400'}>{game.rating}</Text>
                </DefinitionItem>
            </SimpleGrid>
        </>
    )
}

export default GameAttributes