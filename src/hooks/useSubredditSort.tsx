import router from "next/router";
import { useEffect, useState } from "react";

type sortType = "score" | "created" | "num_comments";

function useSubredditSort(postsData: any[]) {
  const [sortType, setSortType] = useState(null);
  const [sortedPosts, setSortedPosts] = useState(null);

  useEffect(() => {
    if (postsData) {
      setSortedPosts(postsData);
    }
  }, [postsData]);

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
  const sortPostsBy = (type: sortType, sortType: string, ascending = true) => {
    setSortType(sortType);
    setSortedPosts((post) => {
      const sortedData = post.sort((a, b) => {
        if (ascending) {
          return b.data[type] - a.data[type];
        } else {
          return a.data[type] - b.data[type];
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
  };
}

export default useSubredditSort;
