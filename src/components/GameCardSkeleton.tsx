import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react'

const GameCardSkeleton = ({ height }: { height: string }) => {
    return (
        <Card>
            <Skeleton height={height} />
            <CardBody>
                <SkeletonText />
            </CardBody>
        </Card>
    )
}

export default GameCardSkeleton