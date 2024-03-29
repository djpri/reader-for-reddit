import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  addNewSavedSubreddit,
  removeSavedSubreddit,
  selectSavedSubreddits,
} from "src/redux/slices/appSlice";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import Post from "../PostCard/SubredditPost";
import { PostData } from "../types";
import usePostsFilter from "../usePostsFilter";
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
  const { filteredPosts, numPostsFiltered } = usePostsFilter(pages);
  const router: NextRouter = useRouter();
  const { sort, t } = router.query;
  const iconColor = useColorModeValue("#737504", "#c4c722");
  const [selectedId, setSelectedId] = useState("");

  const savedSubreddits = useAppSelector(selectSavedSubreddits);

  const dispatch = useAppDispatch();

  if (error) return <p>Something went wrong loading posts.</p>;

  if (isLoading) {
    return (
      <>
        <Flex
          mb="20px"
          justifyContent="space-between"
          alignItems="center"
          gap="5"
        >
          <Heading as="h1" fontSize="xl" mb="20px">
            {`/r/${subreddit}`}
          </Heading>
        </Flex>
        <Spinner />
      </>
    );
  }

  const SortButtons = () => (
    <HStack my="10px" className="post-sort-menu">
      {subredditSortTypes.map((type) => (
        <Button
          className="post-sort-button"
          rounded="sm"
          size="sm"
          fontSize={["xs", "sm", "sm"]}
          key={type}
          color={sort === type && "teal.500"}
          boxShadow="rgb(0 0 0 / 6%) 0px 1px 4px, rgb(0 0 0 / 18%) 0px 2px 2px"
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
          <Heading as="h1" fontSize="xl">
            {subreddit && `/r/${subreddit}`}
          </Heading>
          {savedSubreddits.find(sub => sub === subreddit) ? (
            <IconButton
              boxShadow="rgb(0 0 0 / 6%) 0px 1px 2px, rgb(0 0 0 / 28%) 0px 2px 2px"
              size="xs"
              icon={<AiFillStar color={iconColor} />}
              aria-label={"add-subreddit"}
              color="white"
              onClick={() => {
                dispatch(removeSavedSubreddit(subreddit as string));
              }}
            />
          ) : (
            <IconButton
              size="xs"
              icon={<AiOutlineStar color="white" />}
              aria-label={"add-subreddit"}
              color="white"
              onClick={() => {
                dispatch(addNewSavedSubreddit(subreddit as string));
              }}
            />
          )}
        </HStack>
        {pages && <SortButtons />}
      </Flex>

      {(sort === "top" || sort === "controversial") && (
        <TimeOptions t={t as string} />
      )}

      {numPostsFiltered > 0 && (
        <Text mb="10px" fontSize="sm">
          * {numPostsFiltered} post{numPostsFiltered !== 1 && "s"} filtered
        </Text>
      )}

      {filteredPosts?.length > 0 &&
        filteredPosts.map((post: { data: PostData }, index: number) => (
          <Post
            key={index}
            postData={post.data}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}

      {!pages || pages[0].children.length <= 0 ? (
        <Text>No posts found.</Text>
      ) : (
        <Button
          w="100%"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          Get more posts
        </Button>
      )}
    </div>
  );
}

export default Posts;
