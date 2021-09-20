import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import Post from "../../../src/components/Post/_Post";
import { Container, Text, Heading, Box, Link } from "@chakra-ui/react";
import CommentsTree from "../../../src/components/CommentsTree/CommentsTree";
import ReactMarkdown from "react-markdown";
import NextLink from "next/link";
import appOnlyAuth from "../../../src/snoowrap/snoowrap";

function Submission({ comments, title, selftext, subreddit }) {
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
    <Container maxW="container.xl" mt="10">
      {subreddit ? (
        <NextLink href={`/r/${subreddit}`} passHref>
          <Link>{subreddit}</Link>
        </NextLink>
      ) : (
        <Link>no subreddit</Link>
      )}
      <Heading as="h4" size="md" mb="5">
        {title}
      </Heading>
      {selftext && (
        <Box
          className="comment"
          border="2px solid gray"
          borderRadius="5px"
          pl="5"
          pr="5"
          maxW="container.xl"
        >
          <ReactMarkdown>{selftext}</ReactMarkdown>
        </Box>
      )}

      {/* <Post /> */}
      <CommentsTree comments={comments} />
    </Container>
  );
}

export default Submission;

export async function getServerSideProps({ params }) {
  const { submission } = params;
  const r = await appOnlyAuth;
  const title = await r.getSubmission(submission).title;
  const subreddit = await r.getSubmission(submission).subreddit.display_name;
  const selftext = await r.getSubmission(submission).selftext;
  const comments = await r.getSubmission(submission).comments;
  return {
    props: {
      comments: JSON.parse(JSON.stringify(comments)) || null,
      title: JSON.parse(JSON.stringify(title)) || null,
      selftext: JSON.parse(JSON.stringify(selftext)) || null,
      subreddit: JSON.parse(JSON.stringify(subreddit)) || null,
    },
  };
}

// export async function getServerSideProps({ params }) {
//   const submission = params.submission;
//   // Fetch data from reddit API
//   const response = await fetch(
//     `http://localhost:3000/api/r/comments/${submission}`
//   );
//   let data;
//   if (response.ok) {
//     data = await response.json();
//   }
//   // console.log(data.subreddit);
//   // Pass data to the page via props
//   return {
//     props: {
//       comments: data?.comments || null,
//       title: data?.title || null,
//       selftext: data?.selftext || null,
//       subreddit: data?.subreddit || null,
//     },
//   };
// }
