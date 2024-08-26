import { Image, SimpleGrid, Spinner } from '@chakra-ui/react';
import React from 'react'
import useScreenshots from '../hooks/useScreenshots';

interface Props {
    gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
    const { data: screenshots, error, isLoading } = useScreenshots(gameId);

    if (error) return null;
    if (isLoading) return <Spinner />

    console.log(screenshots)

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                {screenshots?.results.map((screenshot) => (
                    <Image
                        key={screenshot.id}
                        src={screenshot.image}
                        alt={screenshot.image}
                    />
                ))}
            </SimpleGrid>
        </>
    )
}

export default GameScreenshots;