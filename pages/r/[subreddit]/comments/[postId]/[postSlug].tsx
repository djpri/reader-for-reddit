import { Container, Spinner } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
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

function Submission() {
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
  }, [queryParams.sort]);

  const { isLoading, error, data } = useInfiniteQuery(
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
    } else {
      setComments(null);
    }
  }, [data]);

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
      <CommentsTree comments={comments} showChildComments={showChildComments} />
    </Container>
  );
}

export default Submission;
