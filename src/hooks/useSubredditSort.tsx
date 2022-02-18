import router from "next/router";
import { useEffect, useState } from "react";

function useSubredditSort(postsData: any[]) {
  const [sortType, setSortType] = useState(null);
  const [sortedPosts, setSortedPosts] = useState(postsData);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (postsData) {
      setSortedPosts(postsData);
    }
  }, [postsData]);

  useEffect(() => {
    const handleRouteChange = () => {
      setisLoading(false);
      setSortType(null);
      setIsError(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  // for sorting posts by new, old, top, most commented
  const sortPostsBy = (type, sortType, ascending = true) => {
    setSortType(sortType);
    setSortedPosts((data) => {
      const sortedData = data.sort((a, b) => {
        if (ascending) {
          return b[type] - a[type];
        } else {
          return a[type] - b[type];
        }
      });
      // spread operator required because sort does not make a copy of original array
      return [...sortedData];
    });
  };

  const handleSearch = () => {
    if (!search) {
      setIsError(true);
      return;
    }
    setisLoading(true);
    setIsError(false);
    router.push(`/r/${search}`);
  };

  return {
    sortPostsBy,
    handleSearch,
    setSearch,
    sortedPosts,
    sortType,
    search,
    isError,
    isLoading,
  };
}

export default useSubredditSort;
