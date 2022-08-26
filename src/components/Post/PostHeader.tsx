/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
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
  const bgColor = useColorModeValue("gray.100", "gray.800");

  const SortMenu = () => (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        rightIcon={<HiChevronDown />}
        transitionDelay="100"
      >
        Sorted by:
        <Text as="span" color="teal.400" ml="3">
          {sortNames[sortType]}
        </Text>
      </MenuButton>
      <MenuList>
        {Object.keys(sortNames).map((sort) => (
          <MenuItem
            key={sort}
            onClick={() => setSort(sort)}
            isActive={sort === sortType}
          >
            {sortNames[sort]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

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
        <Box
          maxW="30vw"
          boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        >
          <img src={url} alt={url} />
        </Box>
      )}

      {selftext && (
        <Box
          className="comment"
          bgColor={bgColor}
          border="1px"
          borderColor="whiteAlpha.400"
          borderRadius="5px"
          px={5}
          py={2}
          rounded="md"
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
      <SortMenu />
    </div>
  );
}

export default PostHeader;
