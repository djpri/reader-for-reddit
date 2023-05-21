import { useMemo, useState } from "react";
import { selectPostKeywordsFilter, selectShowNSFW } from "src/redux/slices/appSlice";
import { useAppSelector } from "src/redux/store";
import { PostData } from "./types";

type Post = { data: PostData };
type Page = { before: string; after: string; children: Post[] };

function usePostsFilter(pages: any) {
  const [sortType, setSortType] = useState(null);
  const showNSFW = useAppSelector(selectShowNSFW);
  const postKeywords = useAppSelector(selectPostKeywordsFilter);

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
    if (unfilteredPosts.length <= 0) return [];

    return unfilteredPosts.filter((post: Post) => {
      if (!showNSFW && post.data.over_18) return false;

      const postTitle = post.data.title.toLowerCase();
      console.log(postTitle)
      console.log(postKeywords)
      const postContainsKeywords = postKeywords.some((keyword) =>
        postTitle.includes(keyword.toLowerCase())
      );
    
      if (postContainsKeywords) {
        console.log("post contains keywords")
        return false;
      }
      return true
    });
  }, [showNSFW, postKeywords, unfilteredPosts]);

  const numPostsFiltered = useMemo(() => {
    return unfilteredPosts.length - filteredPosts.length;
  }, [filteredPosts, unfilteredPosts]);

  return {
    filteredPosts,
    numPostsFiltered,
    sortType,
    setSortType,
  };
}

export default usePostsFilter;
