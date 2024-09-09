import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { ButtonGroup, HStack, IconButton, Image } from '@chakra-ui/react'
import { useState } from 'react'


interface Props {
    images: string[] | undefined
}



const Carousel = ({ images }: Props) => {
    if (images === undefined) return <></>
    const [imageIndex, setImageIndex] = useState(0);


    const handlePreviousClick = () => {
        setImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }

    const handleNextClick = () => {
        setImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }




    return (
        <>
            <HStack className='relative'>
                <Image
                    objectFit={'cover'}
                    display={'block'}
                    width={'100%'}
                    src={images[imageIndex]}
                    alt={images[imageIndex]}
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
                        isDisabled={imageIndex === 0}
                    />
                    <IconButton
                        onClick={handleNextClick}
                        borderRadius={'full'}
                        aria-label='Next'
                        size={'lg'}
                        icon={<ChevronRightIcon />}
                        variant={'outline'}
                        isDisabled={imageIndex === images.length - 1}
                    />
                </ButtonGroup>
            </HStack>
        </>
    )
}

export default Carousel
