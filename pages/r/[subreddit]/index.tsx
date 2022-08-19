import { Container } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
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
  } = useQuery(["subredditPosts", subreddit], () =>
    loadSubredditPosts(subreddit, after)
  );

  useEffect(() => {
    if (posts && !isLoading && !error) {
      document.title = posts?.children[0].data.subreddit_name_prefixed;
    }
  }, [error, isLoading, posts]);

  return (
    <Container maxWidth="container.xl">
      <Posts
        subreddit={subreddit}
        posts={posts?.children}
        isLoading={isLoading}
        error={error}
        setAfter={setAfter}
      />
    </Container>
  );
}

export default Subreddit;
