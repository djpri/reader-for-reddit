import { Container } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { loadSubredditPosts } from "src/components/Subreddit/getSubredditData";
import SubredditSearch from "src/components/Subreddit/SubredditSearch";
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

  return (
    <Container maxWidth="container.xl">
      <SubredditSearch />
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
