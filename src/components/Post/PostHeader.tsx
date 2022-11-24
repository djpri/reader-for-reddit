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
import moment from "moment";
import NextLink from "next/link";
import { Dispatch, SetStateAction } from "react";
import { HiChevronDown } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { SortType } from "src/types/sortTypes";
import DragToResizeImage from "../Images/DragToResizeImage";

const sortNames = {
  confidence: "Best",
  top: "Top",
  new: "New",
  controversial: "Controversial",
  old: "Old",
  random: "Random",
  qa: "Q&A",
};

interface IProps {
  postDetails: any;
  showChildComments: boolean;
  toggleAllChildComments: () => void;
  sortType: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
}

function PostHeader({
  postDetails,
  showChildComments,
  toggleAllChildComments,
  sortType,
  setSort,
}: IProps) {
  const { num_comments, title, selftext, subreddit, url, created, author } =
    postDetails;
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const sortColor = useColorModeValue("blue.400", "blue.300");

  const SortMenu = () => (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        rightIcon={<HiChevronDown />}
        transitionDelay="100"
      >
        Sorted by:
        <Text as="span" color={sortColor} ml="3">
          {sortNames[sortType]}{" "}
        </Text>
      </MenuButton>
      <MenuList>
        {Object.keys(sortNames).map((sort: string) => (
          <MenuItem key={sort} onClick={() => setSort(sort as SortType)}>
            {sortNames[sort as SortType]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  if (!postDetails) return null;

  return (
    <div>
      {subreddit ? (
        <NextLink href={`/r/${subreddit}`} passHref legacyBehavior>
          <Link>{subreddit}</Link>
        </NextLink>
      ) : (
        <Link>no subreddit</Link>
      )}

      <Heading as="h4" size="md" mb="5">
        <NextLink href={url} passHref legacyBehavior>
          <Link target="_blank">{title}</Link>
        </NextLink>
      </Heading>

      {/* show image for suitable file extensions */}
      {url?.match(/^.*\.(jpg|JPG|png|PNG)$/) && (
        <DragToResizeImage url={url} alt={`${url.substring(0, 10)}...`} />
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

      <Box fontSize="sm" my={2}>
        <Text color="gray" as="span">
          submitted {moment(created * 1000).fromNow()} by
        </Text>{" "}
        <Text as="span">{author}</Text>
      </Box>

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
