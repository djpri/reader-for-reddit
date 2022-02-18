import router from "next/router";
import { useState } from "react";

function useSubredditSearch() {
  const [search, setSearch] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = () => {
    if (!search) {
      setIsError(true);
      return;
    }
    setisLoading(true);
    setIsError(false);
    router.push(`/r/${search}`);
  };

  return { handleSearch, setSearch, search, isError, isLoading };
}

export default useSubredditSearch;
