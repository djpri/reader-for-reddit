import { Container, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import useRedditApi from "../../hooks/useRedditApi";
import useSubredditSort from "../../hooks/useSubredditSort";
import { loadSubredditPosts } from "../../redditApi/subreddit";
import { PostData } from "../../types/post";
import Post from "../Post/Post";
import SubredditSort from "./PostsSort";

function Posts() {
  const router = useRouter();
  const { subreddit } = router.query;
  const apiCallHandler = useCallback(
    () => loadSubredditPosts(subreddit),
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
        subSort.sortedPosts.map((post: PostData, index: number) => (
          <Post key={index} postData={post} />
        ))}

      {!posts && (
        <Text>
          No posts found. This subreddit does not exist or no longer exists.
        </Text>
      )}
    </Container>
  );
}

export default Posts;
