import { useCallback } from "react";
import Post from "../../src/components/Post/_Post";
import { Container, Text, Heading } from "@chakra-ui/react";
import useSubredditSort from "../../src/hooks/useSubredditSort";
import { loadSubreddit } from "../../src/redditApi/loadSubreddit";
import { useRouter } from "next/router";
import SubredditSort from "../../src/components/Subreddit/SubredditSort/SubredditSort";
import useRedditApi from "../../src/hooks/useRedditApi";

function Subreddit() {
  const router = useRouter();
  const { subreddit } = router.query;
  const apiCallHandler = useCallback(
    () => loadSubreddit(subreddit),
    [subreddit]
  );
  const { isLoading, error, data: posts } = useRedditApi(apiCallHandler);

  const subSort = useSubredditSort(posts?.children);

  if (error) return <p>never mind</p>;

  if (isLoading)
    return (
      <Container maxW="container.xl">
        <p>WAIT</p>
      </Container>
    );

  return (
    <Container maxW="container.xl">
      {posts && <SubredditSort subSort={subSort} />}

      <Heading as="h1" mb="30px" mt="10px" fontSize="3xl">
        {subSort.sortType} Posts from {`/r/${subreddit}`}
      </Heading>

      {subSort.sortedPosts &&
        subSort.sortedPosts.map((post, index) => (
          <Post key={index} postData={post.data} />
        ))}

      {!posts && (
        <Text>
          No posts found. This subreddit does not exist or no longer exists.
        </Text>
      )}
    </Container>
  );
}

export default Subreddit;
