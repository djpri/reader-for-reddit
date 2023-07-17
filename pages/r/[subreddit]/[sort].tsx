import { Container } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Posts from "src/components/Subreddit/PostsList/SubredditPosts";
import { loadSubredditPosts } from "src/components/Subreddit/getSubredditData";
import { SubredditSortType } from "src/components/Subreddit/types";
import BaseContainer from "src/components/base/BaseContainer";

const subredditSortTypes = ["hot", "new", "top", "controversial", "rising"];

function Subreddit() {
  const router = useRouter();
  const { subreddit, sort, t } = router.query;
  const [sortType, setSortType] = useState<SubredditSortType>("hot");

  const {
    isLoading,
    error,
    data: posts,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["subredditPosts", subreddit, sortType, t],
    ({ pageParam = null }) =>
      loadSubredditPosts(subreddit, sortType, pageParam, t as string)
  );

  useEffect(() => {
    if (sort && subredditSortTypes.includes(sort as string)) {
      setSortType(sort as SubredditSortType);
    }
  }, [sort]);

  useEffect(() => {
    if (posts && !isLoading && !error) {
      document.title =
        posts.pages[0]?.children[0]?.data.subreddit_name_prefixed ||
        "No posts found";
    }
  }, [error, isLoading, posts]);

  return (
    <BaseContainer>
      <Posts
        subreddit={subreddit}
        pages={posts?.pages}
        isLoading={isLoading}
        error={error}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </BaseContainer>
  );
}

export default Subreddit;
