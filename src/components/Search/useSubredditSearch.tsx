import router from "next/router";
import { useEffect, useState } from "react";
import { RedditAPI } from "src/redditApi";

const getSearchResults = async (query: string) => {
  if (!query) {
    return;
  }
  try {
    const response = await RedditAPI.get("api/subreddit_autocomplete_v2", {
      params: {
        include_over_18: true,
        include_profiles: false,
        query: query,
        typeahead_active: true,
      },
    });
    const searchResults = response.data.children;

    return searchResults;
  } catch (error) {
    console.log(error);
    return null;
  }
};

function useSubredditSearch() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      const results = await getSearchResults(search);
      setSearchResults(results);
      setisLoading(false);
      setIsError(false);
      return results;
    }
    // debounce the search
    const timeout = setTimeout(() => {
      fetchData();
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const handleSearch = () => {
    if (!search) {
      setIsError(true);
      return;
    }
    setisLoading(true);
    setIsError(false);
    router.push(`/r/${search}`);
    setisLoading(false);
  };

  return { handleSearch, setSearch, search, isError, isLoading, searchResults };
}

export default useSubredditSearch;
