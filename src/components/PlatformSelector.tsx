import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";
import { Platform } from "../validation/validate";



const PlatformSelector = () => {
    const setSelectedPlatformId = useGameQueryStore(s => s.setPlatformId)
    const selectedPlatformId = useGameQueryStore(s => s.gameQuery.platformId);
    const { data, error } = usePlatforms();
    const selectedPlatform = usePlatform(selectedPlatformId);


    if (error) return null;


    return (
        <>

            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<BsChevronDown />}
                >
                    {selectedPlatform?.name || 'Platforms'}
                </MenuButton>
                <MenuList>
                    {data?.results.map((platform: Platform) => (
                        <MenuItem
                            onClick={() => setSelectedPlatformId(platform.id)}
                            key={platform.id}
                            value={platform.id}
                        >
                            {platform.name}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
};

export default PlatformSelector;
