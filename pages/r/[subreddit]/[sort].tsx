import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { loadSubredditPosts } from "src/components/Subreddit/getSubredditData";
import Posts from "src/components/Subreddit/SubredditPosts";
import { SubredditSortType } from "src/components/Subreddit/types";

const subredditSortTypes = ["hot", "new", "top", "controversial", "rising"];

function Subreddit() {
  const router = useRouter();
  const { subreddit, sort, t } = router.query;
  console.log(router.query);
  const [after, setAfter] = useState(null);
  const [sortType, setSortType] = useState<SubredditSortType>("hot");

  const {
    isLoading,
    error,
    data: posts,
    fetchNextPage,
  } = useInfiniteQuery(["subredditPosts", subreddit, sortType, t], () =>
    loadSubredditPosts(subreddit, sortType, after, t as string)
  );

  useEffect(() => {
    if (sort && subredditSortTypes.includes(sort as string)) {
      setSortType(sort as SubredditSortType);
      setAfter(null);
    }
  }, [sort]);

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
