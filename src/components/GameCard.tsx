import { Card, CardBody, Heading, HStack, Image } from '@chakra-ui/react'
import { Clink } from 'clink-react'
import getCroppedImageUrl from '../services/image-url'
import { Game } from '../validation/validate'
import CriticScore from './CriticScore'
import Emoji from './Emoji'
import PlatformIconList from './PlatformIconList'



const GameCard = ({ game }: { game: Game }) => {
    return (
        <Card >
            <Image src={getCroppedImageUrl(game.background_image || '')} />
            <CardBody>
                <HStack justifyContent='space-between' marginBottom={3}>
                    <PlatformIconList platforms={game.parent_platforms?.map(p => p.platform)} />
                    <CriticScore score={game.metacritic ?? 0} />
                </HStack>
                <Heading fontSize='2xl'>
                    <Clink to={`/games/${game.slug}`}>{game.name}</Clink>
                    <Emoji rating={game.rating_top} />
                </Heading>
            </CardBody>
        </Card>
    )
}

export default GameCard