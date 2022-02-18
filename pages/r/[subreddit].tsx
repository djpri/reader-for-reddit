import { useEffect, useState } from "react";
import Post from "../../src/components/Post/_Post";
import { Container, Text, Heading } from "@chakra-ui/react";
import useSubredditSort from "../../src/hooks/useSubredditSort";
import { loadSubreddit } from "../../src/redditApi";
import { useRouter } from "next/router";
import SubredditSort from "../../src/components/Subreddit/SubredditSort/SubredditSort";

function Subreddit() {
  const [posts, setPosts] = useState(null);
  const router = useRouter();

  const { subreddit } = router.query;

  const subSort = useSubredditSort(posts);

  useEffect(() => {
    const getSubData = async () => {
      try {
        const { children } = await loadSubreddit(subreddit);
        setPosts(children);
      } catch (error) {
        setPosts(null);
      }
    };
    getSubData();
  }, [subreddit]);

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
