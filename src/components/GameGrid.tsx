import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
// import InfiniteScroll from "react-infinite-scroll-component";



const GameGrid = () => {
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,

    } = useGames();
    const skeletons = [1, 2, 3, 4, 5, 6];

    if (error) return <Text>{error.message}</Text>;


    const loadingSkeletons = isLoading &&
        skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
                <GameCardSkeleton height="200px" />
            </GameCardContainer>
        ))

    const listOfGames = data?.pages.map((page, index) =>
        <React.Fragment key={index}>
            {page.results.map((game) => (
                <GameCardContainer key={game.id} >
                    <GameCard game={game} />
                </GameCardContainer>
            ))}
        </React.Fragment>
    )

    return (
        <Box padding={'10px'}>
            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                spacing={6}
            >
                {loadingSkeletons}
                {listOfGames}
            </SimpleGrid>
            {hasNextPage && (
                <Button
                    isLoading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    marginY={5}
                >
                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </Button>
            )}
        </Box>
    );
};

export default GameGrid;

{/*
     <InfiniteScroll
                dataLength={fetchedGamesCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<GameCardSkeleton />}
            > 
 */}