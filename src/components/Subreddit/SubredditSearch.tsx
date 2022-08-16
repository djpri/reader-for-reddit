import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import useSubredditSearch from "../../hooks/useSubredditSearch";
import { BiSearch } from "react-icons/bi";

function SubredditSearch() {
  const { handleSearch, setSearch, search, isLoading } = useSubredditSearch();
  return (
    <InputGroup size="md" spacing={2} mb="20px">
      <Input
        placeholder="Type in a subreddit"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <InputRightElement w="6rem">
        <IconButton
          m="0"
          colorScheme="whiteAlpha"
          color="white"
          isLoading={isLoading}
          aria-label="Search database"
          icon={<BiSearch />}
          onClick={handleSearch}
          w="100%"
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default SubredditSearch;
