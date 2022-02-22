import { Box, Link, Heading, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

function PostHeader({
  postDetails,
  showChildComments,
  toggleAllChildComments,
}) {
  const { num_comments, title, selftext, subreddit, url } = postDetails;

  if (!postDetails) return null;

  return (
    <div>
      {subreddit ? (
        <NextLink href={`/r/${subreddit}`} passHref>
          <Link>{subreddit}</Link>
        </NextLink>
      ) : (
        <Link>no subreddit</Link>
      )}

      <Heading as="h4" size="md" mb="5">
        <NextLink href={url} passHref>
          <Link target="_blank">{title}</Link>
        </NextLink>
      </Heading>

      {/* show image for suitable file extensions */}
      {url?.match(/^.*\.(jpg|JPG|png|PNG)$/) && (
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
          // transformLinkUri={(href) => (
          //   <a style={{ color: "yellow" }}>baba link {href}</a>
          // )}
          >
            {selftext}
          </ReactMarkdown>
        </Box>
      )}

      <HStack mt="10px" spacing={5}>
        <div>{num_comments} comments</div>
        <Link onClick={toggleAllChildComments} color="gray.500">
          {showChildComments
            ? "hide all child comments"
            : "show all child comments"}
        </Link>
      </HStack>
    </div>
  );
}

export default PostHeader;
