import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const DefinitionItem = (props: {
    term: string
    children: React.ReactNode | React.ReactNode[]
}) => {

    const { term, children } = props
    return (
        <>
            <Box my={5}>
                <Heading as='dt' fontSize='md' color='gray.600'>{term}</Heading>
                <dd>{children}</dd>
            </Box>
        </>
    )
}

export default DefinitionItem
