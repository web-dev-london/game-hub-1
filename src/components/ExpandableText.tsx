import { Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
    children: string;
}

const ExpandableText = ({ children }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const limit = 300;

    if (!children) return null

    if (children.length <= limit)
        return <Text>{children}</Text>

    const summary = children.substring(0, limit).concat('...');

    return (
        <Text >
            {isExpanded ? children : summary}
            <Text
                onClick={() => setIsExpanded(!isExpanded)}
                cursor={'pointer'}
                fontWeight={'bold'}
                as="span"
                color={isExpanded ? 'yellow.500' : 'blue.500'}
                ml={1}
            >
                {isExpanded ? ' Show less' : ' Read more'}
            </Text>
        </Text>
    )
}

export default ExpandableText