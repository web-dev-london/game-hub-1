import React from "react";
import { Box, Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
    gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGames(gameQuery);
    const skeletons = [1, 2, 3, 4, 5, 6];

    if (error) return <Text>{error.message}</Text>;

    const fetchedGamesCount = data?.pages.reduce((total, page) => total + page.results.length, 0) || 0

    return (
        <Box padding={'10px'}>
            <InfiniteScroll
                dataLength={fetchedGamesCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<GameCardSkeleton />}
            >
                <SimpleGrid
                    columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                    spacing={6}
                >
                    {isLoading &&
                        skeletons.map((skeleton) => (
                            <GameCardContainer key={skeleton}>
                                <GameCardSkeleton />
                            </GameCardContainer>
                        ))}
                    {data?.pages.map((page, index) =>
                        <React.Fragment key={index}>
                            {page.results.map((game) => (
                                <GameCardContainer >
                                    <GameCard game={game} />
                                </GameCardContainer>
                            ))}
                        </React.Fragment>
                    )}
                </SimpleGrid>
            </InfiniteScroll>
            {/* {hasNextPage && (
                <Button
                    isLoading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    marginY={5}
                >
                    {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </Button>
            )} */}
        </Box>
    );
};

export default GameGrid;
