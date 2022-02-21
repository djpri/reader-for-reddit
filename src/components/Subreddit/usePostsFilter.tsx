import router from "next/router";
import { useEffect, useState } from "react";

type sortType = "score" | "created" | "num_comments" | null;

function usePostsFilter(postsData: any[]) {
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [sortType, setSortType] = useState<sortType>(null);
  const [filterType, setFilterType] = useState(null);
  const [sortedPosts, setSortedPosts] = useState(null);

  useEffect(() => {
    if (postsData) {
      setSortedPosts(postsData);
    }
  }, [postsData]);

  useEffect(() => {}, []);

  useEffect(() => {}, [sortType]);

  useEffect(() => {
    const handleRouteChange = () => {
      setSortType(null);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  // for sorting posts by new, old, top, most commented
  const sortPostsBy = (field: sortType, sortType: string, ascending = true) => {
    setSortType(sortType);
    setSortedPosts((post) => {
      const sortedData = post.sort((a, b) => {
        if (ascending) {
          return b.data[field] - a.data[field];
        } else {
          return a.data[field] - b.data[field];
        }
      });
      // spread operator required because sort does not make a copy of original array
      return [...sortedData];
    });
  };

  return {
    sortPostsBy,
    sortedPosts,
    sortType,
    setSortType,
  };
}

export default usePostsFilter;
