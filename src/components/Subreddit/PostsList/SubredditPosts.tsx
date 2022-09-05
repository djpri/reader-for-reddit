import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import usePostsFilter from "../usePostsFilter";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  addSubToLocalStorage,
  isSavedInStorage,
  removeSubFromLocalStorage,
} from "src/localStorage";
import Post from "../PostCard/SubredditPost";
import { PostData } from "../types";
import TimeOptions from "./TimeOptions";

const subredditSortTypes = ["hot", "new", "top", "controversial", "rising"];

type Page = {
  after: string;
  before: string;
  children: any[];
};

interface IProps {
  subreddit: string | string[];
  pages: Page[];
  error: unknown;
  isLoading: boolean;
  fetchNextPage: any;
  isFetchingNextPage: boolean;
}

function Posts({
  subreddit,
  pages,
  error,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
}: IProps) {
  const { filteredPosts } = usePostsFilter(pages);
  const router: NextRouter = useRouter();
  const { sort, t } = router.query;
  const [isSavedSubreddit, setIsSavedSubreddit] = useState(false);

  useEffect(() => {
    setIsSavedSubreddit(isSavedInStorage(subreddit as string));
  }, [subreddit]);

  if (error) return <p>{error}</p>;

  if (isLoading) {
    return (
      <>
        <Flex
          mb="20px"
          justifyContent="space-between"
          alignItems="center"
          gap="5"
        >
          <Heading as="h1" fontSize="2xl" mb="20px">
            {`/r/${subreddit}`}
          </Heading>
        </Flex>
        <Spinner />
      </>
    );
  }

  const SortButtons = () => (
    <HStack my="10px">
      {subredditSortTypes.map((type) => (
        <Button
          rounded="none"
          size="xs"
          fontSize={["xs", "sm", "sm"]}
          key={type}
          color={sort === type && "teal.500"}
          textDecoration={sort === type ? "underline" : "none"}
          textTransform="capitalize"
          onClick={() => {
            router.push(`/r/${subreddit}/${type}`);
          }}
        >
          {type}
        </Button>
      ))}
    </HStack>
  );

  return (
    <div>
      <Flex
        mb="20px"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <HStack>
          <Heading as="h1" fontSize="2xl">
            {`/r/${subreddit}`}
          </Heading>
          {isSavedSubreddit ? (
            <IconButton
              size="xs"
              icon={<AiFillStar color="yellow" />}
              aria-label={"add-subreddit"}
              color="white"
              onClick={() => {
                setIsSavedSubreddit(false);
                removeSubFromLocalStorage(subreddit as string);
              }}
            />
          ) : (
            <IconButton
              size="xs"
              icon={<AiOutlineStar color="white" />}
              aria-label={"add-subreddit"}
              color="white"
              onClick={() => {
                setIsSavedSubreddit(true);
                addSubToLocalStorage(subreddit as string);
              }}
            />
          )}
        </HStack>
        {pages && <SortButtons />}
      </Flex>

      {(sort === "top" || sort === "controversial") && (
        <TimeOptions t={t as string} />
      )}

      {filteredPosts?.length > 0 &&
        filteredPosts.map((post: { data: PostData }, index: number) => (
          <Post key={index} postData={post.data} />
        ))}

      {!pages && (
        <Text>
          No posts found. This subreddit does not exist or no longer exists.
        </Text>
      )}
      <Button
        w="100%"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        isLoading={isFetchingNextPage}
      >
        Get more posts
      </Button>
    </div>
  );
}

export default Posts;
