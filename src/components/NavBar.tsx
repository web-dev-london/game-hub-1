import { HStack, Image } from '@chakra-ui/react'
import { Clink } from 'clink-react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';


const NavBar = () => {
    return (
        <HStack padding='10px'>
            <Clink to='/'>
                <Image src={logo} boxSize='60px' objectFit={'cover'} />
            </Clink>
            <SearchInput />
            <ColorModeSwitch />
        </HStack>
    )
}

export default NavBar