import { useMemo, useState } from "react";
import { PostData } from "./types";

type Post = { data: PostData };
type Page = { before: string; after: string; children: Post[] };

function usePostsFilter(pages: any) {
  const [sortType, setSortType] = useState(null);
  const [showNSFW, setShowNSFW] = useState(false);

  const unfilteredPosts = useMemo(() => {
    if (!pages || !pages.length) return [];
    const postsArray: Post[] = [];
    pages.forEach((page: Page) => {
      page?.children?.forEach((child: Post) => {
        postsArray.push(child);
      });
    });
    console.log(postsArray);
    return postsArray;
  }, [pages]);

  const filteredPosts = useMemo(() => {
    if (unfilteredPosts.length > 0) {
      return unfilteredPosts.filter((post: any) => {
        return showNSFW || !post.data.over_18;
      });
    }
  }, [showNSFW, unfilteredPosts]);

  return {
    filteredPosts,
    sortType,
    setSortType,
    setShowNSFW,
  };
}

export default usePostsFilter;
