import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import CommentsTree from "src/components/CommentsTree/CommentsTree";
import { useRedditApi } from "src/hooks";
import { loadCommentsFromPost } from "src/redditApi";

function Submission() {
  const router: NextRouter = useRouter();
  const permalink = router.asPath;
  const [comments, setComments] = useState(null);
  const [postInfo, setPostInfo] = useState(null);

  const getComments = useCallback(
    () => loadCommentsFromPost(permalink),
    [permalink]
  );

  const { isLoading, error, data } = useRedditApi(getComments);

  useEffect(() => {
    if (data) {
      setPostInfo(data[0].data);
      setComments(data[1].data.children);
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
      <CommentsTree comments={comments} />
    </Container>
  );
}

export default Submission;
