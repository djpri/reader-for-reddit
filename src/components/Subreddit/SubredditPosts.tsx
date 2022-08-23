import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Post from "./SubredditPost";
import { PostData } from "./types";
import usePostsFilter from "./usePostsFilter";

const subredditSortTypes = ["hot", "new", "top", "controversial", "rising"];

function Posts({ subreddit, posts, error, isLoading, setAfter }) {
  const filteredPosts = usePostsFilter(posts);
  const router = useRouter();
  const { sort, t } = router.query;

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

  const TimeOptions = () => {
    const pathNameWithoutQuery = () => {
      const queryStartIndex = router.asPath.indexOf("?");
      if (queryStartIndex !== -1) {
        return router.asPath.substring(0, queryStartIndex);
      } else {
        return router.asPath;
      }
    };

    const Option = ({ href, text, time }) => (
      <Button size="sm" rounded="none" color={t === time && "teal.500"}>
        <NextLink href={href} passHref scroll={false}>
          <Link>{text}</Link>
        </NextLink>
      </Button>
    );

    return (
      <HStack my="20px">
        <Text>Links from:</Text>
        <Option
          href={`${pathNameWithoutQuery()}?t=hour`}
          text="Past Hour"
          time="hour"
        />
        <Option
          href={`${pathNameWithoutQuery()}?t=day`}
          text="Past 24 Hours"
          time="day"
        />
        <Option
          href={`${pathNameWithoutQuery()}?t=week`}
          text="Past Week"
          time="week"
        />
        <Option
          href={`${pathNameWithoutQuery()}?t=month`}
          text="Past Month"
          time="month"
        />
        <Option
          href={`${pathNameWithoutQuery()}?t=year`}
          text="Past Year"
          time="year"
        />
        <Option
          href={`${pathNameWithoutQuery()}?t=all`}
          text="All Time"
          time="all"
        />
      </HStack>
    );
  };

  return (
    <div>
      <Flex mb="20px" justifyContent="space-between" alignItems="center">
        <Heading as="h1" fontSize="2xl">
          {`/r/${subreddit}`}
        </Heading>
        {posts && <SortButtons />}
      </Flex>

      {(sort === "top" || sort === "controversial") && <TimeOptions />}

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
