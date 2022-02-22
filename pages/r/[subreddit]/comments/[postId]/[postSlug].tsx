import { Container } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import CommentsTree from "src/components/Post/CommentsTree/CommentsTree";
import { loadPostDetailsAndComments } from "src/components/Post/getPostData";
import PostHeader from "src/components/Post/PostHeader";
import useRedditApi from "src/hooks/useRedditApi";

function Submission() {
  const router: NextRouter = useRouter();
  const permalink = router.asPath;
  const [comments, setComments] = useState(null);
  const [postInfo, setPostInfo] = useState(null);

  const { isLoading, error, data } = useQuery(["postDetails", permalink], () =>
    loadPostDetailsAndComments(permalink)
  );

  useEffect(() => {
    if (data) {
      setPostInfo(data.postDetails);
      setComments(data.parentComments);
    } else {
      setPostInfo(null);
      setComments(null);
    }
  }, [data]);

  if (isLoading) return <p>is loading</p>;

  if (error) return <p>error</p>;

  if (!comments) return <p>no comments</p>;

  return (
    <Container maxW="container.xl" mt="10" mb="20">
      <PostHeader postDetails={postInfo} />
      <CommentsTree comments={comments} />
    </Container>
  );
}

export default Submission;
