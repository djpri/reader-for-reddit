import router from "next/router";
import { useEffect, useState } from "react";
import { PostData } from "./types";

type sortType = "score" | "created" | "num_comments" | null;

function usePostsFilter(postsData) {
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [showNSFW, setShowNSFW] = useState(true);
  const [sortedPosts, setSortedPosts] = useState(null);

  useEffect(() => {
    if (postsData) {
      setSortedPosts(postsData);
    }
  }, [postsData]);

  useEffect(() => {
    // setSortedPosts(
    //   postsData.filter((post: any) => {
    //     return showNSFW || !post.data.over_18;
    //   })
    // );
  }, [postsData, showNSFW]);

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
  return {
    sortedPosts,
    sortType,
    setSortType,
  };
}

export default usePostsFilter;
