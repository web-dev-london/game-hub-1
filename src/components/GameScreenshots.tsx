import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    ButtonGroup, Flex, HStack, IconButton, Image, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spinner, useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import useScreenshots from '../hooks/useScreenshots';

interface Props {
    gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
    const [slideNumber, setSlideNumber] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: screenshots, error, isLoading } = useScreenshots(gameId);

    if (screenshots === undefined) return null

    if (error) return null;
    if (isLoading) return <Spinner />

    const handlePreviousClick = () => {
        setSlideNumber((prevIndex) => (prevIndex === 0 ? screenshots?.results.length - 1 : prevIndex - 1));
    }

    const handleNextClick = () => {
        setSlideNumber((prevIndex) => (prevIndex === screenshots?.results.length - 1 ? 0 : prevIndex + 1));
    }


    const listOfImages = screenshots?.results.map((screenshot, index) => (
        <Image
            key={screenshot.id}
            src={screenshot.image}
            alt={screenshot.image}
            cursor={'pointer'}
            onClick={() => {
                setSlideNumber(index);
                onOpen();
            }}
        />
    ))

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} mt={5}>
                {listOfImages}
                <Modal onClose={onClose} size={'5xl'} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Screenshots</ModalHeader>
                        <ModalCloseButton mt={2} />
                        <ModalBody w={'full'}>
                            <HStack className='relative'>
                                <Image
                                    objectFit={'cover'}
                                    display={'block'}
                                    width={'100%'}
                                    src={screenshots?.results[slideNumber]?.image}
                                    rounded={'md'}
                                />

                                <ButtonGroup className='absolute flex justify-between  p-4 w-full '>
                                    <IconButton
                                        onClick={handlePreviousClick}
                                        borderRadius={'full'}
                                        aria-label='Previous'
                                        size={'lg'}
                                        icon={<ChevronLeftIcon />}
                                        variant={'outline'}
                                        isDisabled={slideNumber === 0}
                                    />
                                    <IconButton
                                        onClick={handleNextClick}
                                        borderRadius={'full'}
                                        aria-label='Next'
                                        size={'lg'}
                                        icon={<ChevronRightIcon />}
                                        variant={'outline'}
                                        isDisabled={slideNumber === screenshots?.results.length - 1}
                                    />
                                </ButtonGroup>
                            </HStack>
                        </ModalBody>
                        <ModalFooter>
                            <HStack
                                position={'absolute'}
                                left={'50%'}
                                right={'50%'}
                                bottom={0}
                                transform={'translate(-50%, -50%)'}
                            >
                                <Flex
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    gap='8px'
                                >
                                    {screenshots?.results.map((_, index) => (
                                        <Box
                                            key={index}
                                            cursor={'pointer'}
                                            onClick={() => setSlideNumber(index)}
                                            borderRadius={'full'}
                                            w={3}
                                            h={3}
                                            bg={slideNumber === index ? 'yellow.500' : 'gray.500'}
                                            transition={'all .4s ease'}
                                            _hover={{ bg: 'yellow.600' }}
                                            _active={{ bg: 'yellow.800' }}
                                            className={`${slideNumber === index ? 'p-2.5' : 'p-0.5'}`}
                                        />
                                    ))}
                                </Flex>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </SimpleGrid>
        </>
    )
}

export default GameScreenshots;