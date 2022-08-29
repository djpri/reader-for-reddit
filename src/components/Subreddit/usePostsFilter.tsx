import { useEffect, useState } from "react";

function usePostsFilter(pages: any) {
  const [sortType, setSortType] = useState(null);
  const [showNSFW, setShowNSFW] = useState(true);
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    if (pages && pages.length > 0) {
      setSortedPosts(
        pages[0]?.children?.filter((post: any) => {
          return showNSFW || !post.data.over_18;
        })
      );
    }
  }, [pages, showNSFW]);

  return {
    sortedPosts,
    sortType,
    setSortType,
    setShowNSFW,
  };
}

export default usePostsFilter;
