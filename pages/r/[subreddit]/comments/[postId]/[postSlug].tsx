import { Container } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import CommentsTree from "src/components/Post/CommentsTree/CommentsTree";
import { loadPostDetailsAndComments } from "src/components/Post/getPostData";
import PostHeader from "src/components/Post/PostHeader";

type sortType =
  | "confidence"
  | "new"
  | "top"
  | "controversial"
  | "old"
  | "random"
  | "qa";

function Submission() {
  const router: NextRouter = useRouter();
  const permalink = router.asPath;
  const [comments, setComments] = useState(null);
  const [postInfo, setPostInfo] = useState(null);
  const [sort, setSort] = useState<sortType>("confidence");
  const [showChildComments, setShowChildComments] = useState(false);

  const { isLoading, error, data } = useInfiniteQuery(
    ["postDetails", permalink, sort],
    () => loadPostDetailsAndComments(permalink, sort)
  );

  const toggleAllChildComments = () => {
    setShowChildComments((prevState) => !prevState);
  };

  useEffect(() => {
    if (data) {
      setPostInfo(data.pages[0].postDetails);
      setComments(data.pages[0].parentComments);
    } else {
      setPostInfo(null);
      setComments(null);
    }
  }, [data]);

  useEffect(() => {
    if (postInfo && !isLoading && !error) {
      document.title = postInfo.title;
    }
  }, [error, isLoading, postInfo]);

  if (isLoading) return <p>is loading</p>;

  if (error) return <p>error</p>;

  if (!comments) return <p>no comments</p>;

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
