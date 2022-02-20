import { useRouter } from "next/router";
import { useCallback } from "react";
import { Container, Heading, Box, Link } from "@chakra-ui/react";
import CommentsTree from "src/components/CommentsTree/CommentsTree";
import ReactMarkdown from "react-markdown";
import NextLink from "next/link";
import { useRedditApi } from "src/hooks";
import { loadCommentsFromPost } from "src/redditApi";

function Submission() {
  const getComments = useCallback(() => loadCommentsFromPost(""), []);

  const { isLoading, error, data: comments } = useRedditApi(getComments);

  const router = useRouter();

  return (
    <Container maxW="container.xl" mt="10" mb="20">
      {comments.subreddit ? (
        <NextLink href={`/r/${comments.subreddit}`} passHref>
          <Link>{comments.subreddit}</Link>
        </NextLink>
      ) : (
        <Link>no subreddit</Link>
      )}
      <Heading as="h4" size="md" mb="5">
        <NextLink href={comments.url} passHref>
          <Link>{comments.title}</Link>
        </NextLink>
      </Heading>
      {/* show image for suitable file extensions */}
      {comments.url.match(/^.*\.(jpg|JPG|png|PNG)$/) && (
        <Box w="300px">
          <img src={comments.url} />
        </Box>
      )}
      {comments.selftext && (
        <Box
          className="comment"
          border="1px solid gray"
          borderRadius="5px"
          pl="5"
          pr="5"
          maxW="container.xl"
        >
          <ReactMarkdown
          // transformLinkUri={(href) => (
          //   <a style={{ color: "yellow" }}>baba link {href}</a>
          // )}
          >
            {comments.selftext}
          </ReactMarkdown>
        </Box>
      )}

      {/* <Post /> */}
      <CommentsTree comments={comments} />
    </Container>
  );
}

export default Submission;
