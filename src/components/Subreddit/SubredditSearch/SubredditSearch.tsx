import { Input, Button } from "@chakra-ui/react";
import React from "react";
import useSubredditSearch from "../../../hooks/useSubredditSearch";
import SearchError from "../../Errors/SearchError";

function SubredditSearch() {
  const { handleSearch, setSearch, search, isError, isLoading } =
    useSubredditSearch();
  return (
    <>
      <Input
        placeholder="Type in a subreddit"
        mb="10px"
        mt="30px"
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
        colorScheme="blue"
        color="white"
        size="sm"
        onClick={handleSearch}
      >
        Get Posts
      </Button>
    </>
  );
}

export default SubredditSearch;
