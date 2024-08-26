import { Heading, Spinner, Text } from '@chakra-ui/react';
import React from 'react'
import { useParams } from 'react-router-dom'
import useGame from '../hooks/useGame';

const GameDetailPage = () => {
    const { slug } = useParams();
    const { data: game, error, isLoading } = useGame(slug!);

    if (isLoading) return <Spinner />

    if (!game || error) throw new Error("Game not found")
    return (
        <>
            <Heading>{game.name}</Heading>
            <Text>{game.description_raw}</Text>
        </>
    )
}

export default GameDetailPage