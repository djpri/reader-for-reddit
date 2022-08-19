/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Link,
  Heading,
  HStack,
  Text,
  MenuItem,
  MenuButton,
  Menu,
  Button,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { HiChevronDown } from "react-icons/hi";
import ReactMarkdown from "react-markdown";

const sortNames = {
  confidence: "Best",
  top: "Top",
  new: "New",
  controversial: "Controversial",
  old: "Old",
  random: "Random",
  qa: "Q&A",
};

function PostHeader({
  postDetails,
  showChildComments,
  toggleAllChildComments,
  sortType,
  setSort,
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
          <img src={url} alt={url} />
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

      <HStack mt="10px" mb="10px" spacing={5}>
        <div>{num_comments} comments</div>
        <Link
          onClick={toggleAllChildComments}
          color="gray.500"
          userSelect="none"
        >
          {showChildComments
            ? "hide all child comments"
            : "show all child comments"}
        </Link>
      </HStack>
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            rightIcon={<HiChevronDown />}
            transitionDelay="100"
          >
            Sorted by:
            <Text as="span" color="purple.500" ml="3">
              {sortNames[sortType]}
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSort("Top")}>Top</MenuItem>
            <MenuItem onClick={() => setSort("Newest")}>New</MenuItem>
            <MenuItem onClick={() => setSort("Old")}>Old</MenuItem>
            <MenuItem onClick={() => setSort("controvertial")}>
              Comments
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
}

export default PostHeader;
