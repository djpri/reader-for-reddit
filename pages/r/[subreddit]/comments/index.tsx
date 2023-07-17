import { Button, Container, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import CommentsTree from "src/components/Post/CommentsTree/CommentsTree";
import PostHeader from "src/components/Post/PostHeader";
import { loadPostDetailsAndComments } from "src/components/Post/getPostData";
import BaseContainer from "src/components/base/BaseContainer";
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

function SubmissionPage() {
  const router: NextRouter = useRouter();
  const permalink: string = router.asPath;
  const queryParams: ParsedUrlQuery = router.query;
  const [comments, setComments] = useState<any[]>(null);
  const [postInfo, setPostInfo] = useState<any | null>(null);
  const [sort, setSort] = useState<SortType>("confidence");
  const [showChildComments, setShowChildComments] = useState<boolean>(false);

  useEffect(() => {
    if (queryParams.sort && sortTypes.includes(queryParams.sort as string)) {
      setSort(queryParams.sort as SortType);
    }
  }, [queryParams]);

  const { isLoading, error, data, refetch, isRefetching } = useInfiniteQuery(
    ["postDetails", permalink, sort],
    () => loadPostDetailsAndComments(permalink, sort)
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
      <Container maxW="90vw" mt="10" mb="20">
        {postInfo && (
          <PostHeader
            sortType={sort}
            setSort={setSort}
            postDetails={postInfo}
            showChildComments={showChildComments}
            toggleAllChildComments={toggleAllChildComments}
            refreshComments={refetch}
            isLoading={isRefetching}
          />
        )}
        <Spinner my="10px" />
      </Container>
    );

  if (error)
    return (
      <Container maxW="90vw" mt="10" mb="20">
        error
      </Container>
    );

  if (!comments)
    return (
      <Container maxW="90vw" mt="10" mb="20">
        no comments
      </Container>
    );

  return (
    <BaseContainer>
      <Button leftIcon={<AiFillCaretLeft/>} onClick={() => router.back()} size="sm" mb={4}>BACK</Button>
      <PostHeader
        sortType={sort}
        setSort={setSort}
        postDetails={postInfo}
        showChildComments={showChildComments}
        toggleAllChildComments={toggleAllChildComments}
        refreshComments={refetch}
        isLoading={isRefetching}
      />
      <CommentsTree
        comments={comments}
        showChildComments={showChildComments}
        linkId={postInfo.name}
      />
    </BaseContainer>
  );
}

export default SubmissionPage;
