import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../store";



const SearchInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const setSearchText = useGameQueryStore(s => s.setSearchText);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (ref.current) {
                const searchTerm = ref.current.value;
                if (searchTerm) {
                    setSearchText(searchTerm);
                    const params = new URLSearchParams(searchTerm.toString());
                    params.set("search", searchTerm);
                    navigate(`/?${params.toString()}`);
                } else {
                    navigate("/")
                }
            }

        }}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input ref={ref} borderRadius={20} placeholder="Search games..." variant="filled" />
            </InputGroup>
        </form>
    );
};

export default SearchInput;
