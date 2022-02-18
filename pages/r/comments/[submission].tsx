import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import Post from "../../../src/components/Post/_Post";
import { Container, Text, Heading, Box, Link } from "@chakra-ui/react";
import CommentsTree from "../../../src/components/CommentsTree/CommentsTree";
import ReactMarkdown from "react-markdown";
import NextLink from "next/link";

function Submission({ comments, title, selftext, subreddit, url }) {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState(comments || null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(null);
  const router = useRouter();

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

export async function getServerSideProps({ params }) {
  // const { submission } = params;
  // const r = await appOnlyAuth;
  // const title = await r.getSubmission(submission).title;
  // const url = await r.getSubmission(submission).url;
  // const subreddit = await r.getSubmission(submission).subreddit.display_name;
  // const selftext = await r.getSubmission(submission).selftext;
  // const comments = await r.getSubmission(submission).comments;
  // return {
  //   props: {
  //     comments: JSON.parse(JSON.stringify(comments)) || null,
  //     url: JSON.parse(JSON.stringify(url)) || null,
  //     title: JSON.parse(JSON.stringify(title)) || null,
  //     selftext: JSON.parse(JSON.stringify(selftext)) || null,
  //     subreddit: JSON.parse(JSON.stringify(subreddit)) || null,
  //   },
  // };
}
