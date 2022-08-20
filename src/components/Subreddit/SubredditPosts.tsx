import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Post from "./SubredditPost";
import usePostsFilter from "./usePostsFilter";
import { PostData } from "./types";
import { useRouter } from "next/router";

const subredditSortTypes = ["hot", "new", "top", "controversial", "rising"];

function Posts({ subreddit, posts, error, isLoading, setAfter }) {
  const filteredPosts = usePostsFilter(posts);
  const router = useRouter();
  const { sort } = router.query;

  if (error) return <p>{error}</p>;

  if (isLoading) {
    return (
      <Container maxW="container.xl">
        <Spinner />
      </Container>
    );
  }

  const SortButtons = () => (
    <HStack>
      {subredditSortTypes.map((type) => (
        <Button
          rounded="none"
          key={type}
          color={sort === type ? "teal.500" : "gray.200"}
          textDecoration={sort === type ? "underline" : "none"}
          textTransform="capitalize"
          onClick={() => {
            router.push(`/r/${subreddit}/${type}`);
            setAfter(null);
          }}
        >
          {type}
        </Button>
      ))}
    </HStack>
  );

  return (
    <div>
      <Flex justifyContent="space-between">
        <Heading as="h1" mb="30px" mt="10px" fontSize="2xl">
          {`/r/${subreddit}`}
        </Heading>
        {posts && <SortButtons />}
      </Flex>

      {filteredPosts?.sortedPosts &&
        filteredPosts?.sortedPosts.map(
          (post: { data: PostData }, index: number) => (
            <Post key={index} postData={post.data} />
          )
        )}

      {!posts && (
        <Text>
          No posts found. This subreddit does not exist or no longer exists.
        </Text>
      )}
      <Button w="100%" onClick={() => setAfter(posts.after)}>
        Get more posts
      </Button>
    </div>
  );
}

export default Posts;
