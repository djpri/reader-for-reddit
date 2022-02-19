import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container, Heading, Box, Link } from "@chakra-ui/react";
import CommentsTree from "../../../src/components/CommentsTree/CommentsTree";
import ReactMarkdown from "react-markdown";
import NextLink from "next/link";

function Submission() {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(null);
  const router = useRouter();

  const data = {
    comments: [],
    title: "",
    selftext: "",
    subreddit: "",
    url: "",
  };

  const { comments, title, selftext, subreddit, url } = data;

  useEffect(() => {
    const handleRouteChange = () => {
      setisLoading(false);
      setSortType(null);
      setIsError(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    setPosts(comments);
  }, [comments]);

  return (
    <Container maxW="container.xl" mt="10" mb="20">
      {subreddit ? (
        <NextLink href={`/r/${subreddit}`} passHref>
          <Link>{subreddit}</Link>
        </NextLink>
      ) : (
        <Link>no subreddit</Link>
      )}
      <Heading as="h4" size="md" mb="5">
        <NextLink href={url} passHref>
          <Link>{title}</Link>
        </NextLink>
      </Heading>
      {/* show image for suitable file extensions */}
      {url.match(/^.*\.(jpg|JPG|png|PNG)$/) && (
        <Box w="300px">
          <img src={url} />
        </Box>
      )}
      {selftext && (
        <Box
          className="comment"
          border="1px solid gray"
          borderRadius="5px"
          pl="5"
          pr="5"
          maxW="container.xl"
        >
          <ReactMarkdown
            transformLinkUri={(href) => (
              <a style={{ color: "yellow" }}>baba link {href}</a>
            )}
          >
            {selftext}
          </ReactMarkdown>
        </Box>
      )}

      {/* <Post /> */}
      <CommentsTree comments={comments} />
    </Container>
  );
}

export default Submission;
