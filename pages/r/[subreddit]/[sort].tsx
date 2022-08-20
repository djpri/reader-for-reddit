import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { loadSubredditPosts } from "src/components/Subreddit/getSubredditData";
import Posts from "src/components/Subreddit/SubredditPosts";
import { SubredditSortType } from "src/components/Subreddit/types";

const subredditSortTypes = ["hot", "new", "top", "controversial", "rising"];

function Subreddit() {
  const router = useRouter();
  const { subreddit, sort } = router.query;
  const [after, setAfter] = useState(null);
  const [sortType, setSortType] = useState<SubredditSortType>("hot");

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["subredditPosts", subreddit, sortType], () =>
    loadSubredditPosts(subreddit, sortType, after)
  );

  useEffect(() => {
    if (sort && subredditSortTypes.includes(sort as string)) {
      setSortType(sort as SubredditSortType);
      setAfter(null);
    }
  }, [sort]);

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
