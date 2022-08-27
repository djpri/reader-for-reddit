import { useEffect, useState } from "react";

function usePostsFilter(postsData: any[]) {
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [showNSFW, setShowNSFW] = useState(null);
  false;
  const [sortedPosts, setSortedPosts] = useState(null);

  useEffect(() => {
    setSortedPosts(
      postsData?.filter((post: any) => {
        return showNSFW || !post.data.over_18;
      })
    );
  }, [postsData, showNSFW]);

  return {
    sortedPosts,
    sortType,
    setSortType,
    setShowNSFW,
  };
}

export default usePostsFilter;
