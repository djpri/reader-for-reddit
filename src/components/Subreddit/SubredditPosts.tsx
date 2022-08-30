import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { NextRouter, useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Post from "./SubredditPost";
import { PostData } from "./types";
import usePostsFilter from "./usePostsFilter";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  addSubToLocalStorage,
  isSavedInStorage,
  removeSubFromLocalStorage,
} from "src/localStorage";

const subredditSortTypes = ["hot", "new", "top", "controversial", "rising"];
const defaultTime = "day";

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
  setAfter: Dispatch<SetStateAction<string>>;
  fetchNextPage: any;
}

function Posts({
  subreddit,
  pages,
  error,
  isLoading,
  setAfter,
  fetchNextPage,
}: IProps) {
  const filteredPosts = usePostsFilter(pages);
  const router: NextRouter = useRouter();
  const { sort, t } = router.query;
  const [isSavedSubreddit, setIsSavedSubreddit] = useState(false);

  useEffect(() => {
    setIsSavedSubreddit(isSavedInStorage(subreddit as string));
  }, [subreddit]);

  if (error) return <p>{error}</p>;

  if (isLoading) {
    return (
      <Container maxW="container.xl">
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
      </Container>
    );
  }

  const SortButtons = () => (
    <HStack my="10px">
      {subredditSortTypes.map((type) => (
        <Button
          rounded="none"
          size={"sm"}
          fontSize={["xs", "sm", "md"]}
          key={type}
          color={sort === type && "teal.500"}
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

    interface OptionProps {
      href: string;
      text: string;
      time: string;
    }

    const Option = ({ href, text, time }: OptionProps) => {
      return (
        <Button
          size="sm"
          rounded="none"
          color={
            (t === time || (t === undefined && time === defaultTime)) &&
            "teal.500"
          }
        >
          <NextLink href={href} passHref scroll={false}>
            <Link>{text}</Link>
          </NextLink>
        </Button>
      );
    };

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

      {(sort === "top" || sort === "controversial") && <TimeOptions />}

      {filteredPosts?.sortedPosts &&
        filteredPosts?.sortedPosts.map(
          (post: { data: PostData }, index: number) => (
            <Post key={index} postData={post.data} />
          )
        )}

      {!pages && (
        <Text>
          No posts found. This subreddit does not exist or no longer exists.
        </Text>
      )}
      <Button w="100%" onClick={() => fetchNextPage()}>
        Get more posts
      </Button>
    </div>
  );
}

export default Posts;
