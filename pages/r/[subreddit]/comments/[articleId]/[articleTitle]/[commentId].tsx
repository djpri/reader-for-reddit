import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useInfiniteQuery } from "react-query";
import CommentsTree from "src/components/Post/CommentsTree/CommentsTree";
import { loadPostDetailsAndComments } from "src/components/Post/getPostData";
import PostHeader from "src/components/Post/PostHeader";
import { SortType } from "src/types/sortTypes";

const sortTypes = [
  "confidence",
  "new",
  "top",
  "controversial",
  "old",
  "random",
  "qa",
];

function SingleCommentThreadPage() {
  const router: NextRouter = useRouter();
  const permalink: string = router.asPath;
  const queryParams: ParsedUrlQuery = router.query;
  const [comments, setComments] = useState<any[]>(null);
  const [postInfo, setPostInfo] = useState<any | null>(null);
  const [sort, setSort] = useState<SortType>("confidence");
  const [showChildComments, setShowChildComments] = useState<boolean>(true);
  const bgColor = useColorModeValue("blue.100", "blue.500");

  useEffect(() => {
    if (queryParams.sort && sortTypes.includes(queryParams.sort as string)) {
      setSort(queryParams.sort as SortType);
    }
  }, [queryParams]);

  console.log(queryParams);

  const { isLoading, error, data } = useInfiniteQuery(
    ["postDetails", permalink, sort, queryParams.commentId],
    () =>
      loadPostDetailsAndComments(
        permalink,
        sort,
        queryParams.commentId as string
      )
  );

  const toggleAllChildComments = () => {
    setShowChildComments((prevState) => !prevState);
  };

  useEffect(() => {
    if (data?.pages[0]) {
      setPostInfo(data.pages[0].postDetails);
      setComments(data.pages[0].parentComments);
      if (sort === "confidence" && data.pages[0].postDetails.suggested_sort) {
        setSort(data.pages[0].postDetails.suggested_sort);
      }
    } else {
      setComments(null);
    }
  }, [data, sort]);

  useEffect(() => {
    if (postInfo && !isLoading && !error) {
      document.title = postInfo.title;
    }
  }, [error, isLoading, postInfo]);

  if (isLoading)
    return (
      <Container maxW="container.xl" mt="10" mb="20">
        {postInfo && (
          <PostHeader
            sortType={sort}
            setSort={setSort}
            postDetails={postInfo}
            showChildComments={showChildComments}
            toggleAllChildComments={toggleAllChildComments}
          />
        )}
        <Spinner my="10px" />
      </Container>
    );

  if (error)
    return (
      <Container maxW="container.xl" mt="10" mb="20">
        error
      </Container>
    );

  if (!comments)
    return (
      <Container maxW="container.xl" mt="10" mb="20">
        no comments
      </Container>
    );

  return (
    <Container maxW="container.xl" mt="10" mb="20">
      <PostHeader
        sortType={sort}
        setSort={setSort}
        postDetails={postInfo}
        showChildComments={showChildComments}
        toggleAllChildComments={toggleAllChildComments}
      />
      <Flex
        my={2}
        py={2}
        px={5}
        bgColor={bgColor}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontWeight="700" fontSize="md">
          Single comment thread
        </Heading>
        <NextLink
          href={router.asPath.slice(0, router.asPath.lastIndexOf("/"))}
          passHref
        >
          <Link>
            <Button size="sm" bgColor={bgColor}>
              <BiArrowBack /> <Text ml={2}>Go back to main comment thread</Text>
            </Button>
          </Link>
        </NextLink>
      </Flex>
      <CommentsTree
        comments={comments}
        showChildComments={showChildComments}
        isSingleCommentThread
      />
    </Container>
  );
}

export default SingleCommentThreadPage;
