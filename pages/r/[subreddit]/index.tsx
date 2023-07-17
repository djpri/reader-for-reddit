import { Container } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { loadSubredditPosts } from "src/components/Subreddit/getSubredditData";
import Posts from "../../../src/components/Subreddit/PostsList/SubredditPosts";
import BaseContainer from "src/components/base/BaseContainer";

function Subreddit() {
  const router: NextRouter = useRouter();
  const { subreddit } = router.query;

  const {
    isLoading,
    error,
    data: posts,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["subredditPosts", subreddit],
    ({ pageParam = null }) => loadSubredditPosts(subreddit, "hot", pageParam),
    {
      enabled: false,
      getNextPageParam: (lastPage) => {
        return lastPage.after;
      },
    }
  );

  useEffect(() => {
    if (subreddit) {
      refetch();
    }
  }, [refetch, subreddit]);

  useEffect(() => {
    if (posts && !isLoading && !error) {
      document.title = posts.pages[0]?.children[0].data.subreddit_name_prefixed;
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
