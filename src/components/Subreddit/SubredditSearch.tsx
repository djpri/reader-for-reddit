import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import React from "react";
import useSubredditSearch from "../../hooks/useSubredditSearch";
import SearchError from "../Errors/SearchError";

function SubredditSearch() {
  const { handleSearch, setSearch, search, isError, isLoading } =
    useSubredditSearch();
  return (
    <HStack w="100%" spacing={2} mb="20px">
      <Input
        maxWidth="container.md"
        placeholder="Type in a subreddit"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {isError && <SearchError />}
      <Button
        isLoading={isLoading}
        colorScheme="whiteAlpha"
        color="purple.500"
        variant="outline"
        size="sm"
        onClick={handleSearch}
      >
        Get Posts
      </Button>
    </HStack>
  );
}

export default SubredditSearch;
