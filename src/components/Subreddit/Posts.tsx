import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import useRedditApi from "../../hooks/useRedditApi";
import useSubredditSort from "../../hooks/useSubredditSort";
import { loadSubredditPosts } from "../../redditApi/subreddit";
import Post from "../Post/Post";
import PostSkeleton from "./PostSkeleton";
import SubredditSort from "./PostsSort";

function Posts({ subreddit }) {
  const apiCallHandler = useCallback(
    () => loadSubredditPosts(subreddit),
    [subreddit]
  );

  const { isLoading, error, data: posts } = useRedditApi(apiCallHandler);

  const subSort = useSubredditSort(posts?.children);

  if (error) return <p>{error}</p>;

  if (isLoading) {
    return (
      <Container maxW="container.xl">
        <PostSkeleton />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      <Flex justifyContent="space-between">
        <Heading as="h1" mb="30px" mt="10px" fontSize="2xl">
          {`/r/${subreddit}`}
        </Heading>
        {posts && <SubredditSort subSort={subSort} />}
      </Flex>

      {subSort?.sortedPosts &&
        subSort?.sortedPosts.map((post, index: number) => (
          <Post key={index} postData={post.data} />
        ))}

      {!posts && (
        <Text>
          No posts found. This subreddit does not exist or no longer exists.
        </Text>
      )}
      <Button w="100%">Get more posts</Button>
    </Container>
  );
}

export default Posts;
