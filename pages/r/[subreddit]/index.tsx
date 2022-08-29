import { Container } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { loadSubredditPosts } from "src/components/Subreddit/getSubredditData";
import Posts from "../../../src/components/Subreddit/SubredditPosts";

function Subreddit() {
  const router: NextRouter = useRouter();
  const [after, setAfter] = useState(null);
  const { subreddit } = router.query;

  const {
    isLoading,
    error,
    data: posts,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(
    ["subredditPosts", subreddit],
    () => loadSubredditPosts(subreddit, "hot", after),
    { enabled: false, getNextPageParam: (lastPage) => lastPage.after }
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
    <Container maxWidth="container.xl">
      <Posts
        subreddit={subreddit}
        pages={posts?.pages}
        isLoading={isLoading}
        error={error}
        setAfter={setAfter}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
}

export default Subreddit;
