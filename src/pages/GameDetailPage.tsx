import { Heading, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useParams } from 'react-router-dom'
import ExpandableText from '../components/ExpandableText';
import useGame from '../hooks/useGame';

const GameDetailPage = () => {
    const { slug } = useParams();
    const { data: game, error, isLoading } = useGame(slug!);

    if (isLoading) return <Spinner />

    if (!game || error) throw new Error("Game not found")
    return (
        <>
            <Heading>{game.name}</Heading>
            <ExpandableText>{game.description_raw}</ExpandableText>
        </>
    )
}

export default GameDetailPage