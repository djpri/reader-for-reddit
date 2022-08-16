import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Post from "./SubredditPost";
import PostSkeleton from "./PostSkeleton";
import SubredditSort from "./PostsSort";
import usePostsFilter from "./usePostsFilter";
import { PostData } from "./types";

function Posts({ subreddit, posts, error, isLoading, setAfter }) {
  const subSort = usePostsFilter(posts);

  if (error) return <p>{error}</p>;

  if (isLoading) {
    return (
      <Container maxW="container.xl">
        <PostSkeleton />
      </Container>
    );
  }

  return (
    <div>
      <Flex justifyContent="space-between">
        <Heading as="h1" mb="30px" mt="10px" fontSize="2xl">
          {`/r/${subreddit}`}
        </Heading>
        {posts && <SubredditSort subSort={subSort} />}
      </Flex>

      {subSort?.sortedPosts &&
        subSort?.sortedPosts.map((post: { data: PostData }, index: number) => (
          <Post key={index} postData={post.data} />
        ))}

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
