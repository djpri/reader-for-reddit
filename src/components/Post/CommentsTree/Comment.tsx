import {
  Box,
  Button,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import { textMaxWidth } from "src/constants";
import { formatScore } from "src/helpers";
import { getMoreChildrenComments } from "../getPostData";

type CommentType = {
  kind: string;
  data: any;
};

interface IProps {
  item: CommentType;
  showChildren: boolean;
  linkId: string;
}

function Comment({ item, showChildren, linkId }: IProps) {
  const {
    parent_id,
    depth,
    distinguished,
    is_submitter,
    ups,
    stickied,
    id,
    author,
    score_hidden,
    created_utc,
    body,
    replies,
  } = item.data;
  const [showReplies, setShowReplies] = useState(showChildren);
  const [moreComments, setMoreComments] = useState(null);
  const [moreCommentsLoading, setMoreCommentsLoading] = useState(null);
  false;
  const [displayBody, setDisplayBody] = useState(ups < 0 ? "none" : "block");
  const loadMoreCommentsColor = useColorModeValue("gray.200", "gray.700");
  const moderatorColor = useColorModeValue("green.200", "green.500");
  const opColor = useColorModeValue("blue.100", "blue.600");
  const boxColor = useColorModeValue(
    depth % 2 === 0 ? "gray.100" : "white",
    depth % 2 === 0 ? "gray.800" : "gray.900"
  );

  const router = useRouter();

  const authorColor = () => {
    if (distinguished === "moderator") {
      return moderatorColor;
    }
    if (is_submitter) {
      return opColor;
    }
  };

  const getMoreChildren = async (children: []) => {
    setMoreCommentsLoading(true);
    const result: any = await getMoreChildrenComments(parent_id, children);
    const commentsArray = result?.jquery[10][3][0];
    setMoreComments(commentsArray);
    setMoreCommentsLoading(false);
  };

  useEffect(() => {
    setShowReplies(showChildren);
  }, [showChildren]);

  const children = useMemo(() => {
    const allChildren = item.data?.replies?.data?.children || [];
    if (allChildren.length > 0 && allChildren[0].kind === "more") {
      return allChildren;
    } else {
      return allChildren;
    }
  }, [item.data]);

  const renderChildComment = (item: CommentType, index: number) => {
    if (item.kind === "more" && moreComments) {
      return null;
    }
    if (item.kind === "more")
      return (
        <Link
          mt="10px"
          mb="10px"
          color="purple.500"
          fontSize={["xs", "xs", "sm"]}
          display="block"
          _hover={{ bgColor: loadMoreCommentsColor }}
          onClick={() => getMoreChildren(item.data.children)}
          pointerEvents={moreCommentsLoading ? "none" : "auto"}
        >
          load {`${item.data.count}`} more comments
        </Link>
      );
    return (
      <Comment
        item={item}
        key={index}
        showChildren={showReplies}
        linkId={linkId}
      />
    );
  };

  const getTotalChildComments = (item: CommentType) => {
    let count = 0;
    if (item.kind === "more") {
      return item.data.count;
    }
    if (item.kind === "t1") {
      if (item.data?.replies === "") {
        return count;
      }
      const { children } = item.data.replies.data;
      if (children && children.length > 0) {
        children.forEach((child: CommentType) => {
          count += getTotalChildComments(child);
        });
        count += children.length;
      }
    }
    return count;
  };

  const toggleReplies = () => setShowReplies((prevState) => !prevState);

  if (item.kind === "more") {
    return <Button>Load more comments</Button>;
  }

  return (
    <Box
      display="block"
      w="100%"
      border={stickied ? "2px" : "1px"}
      borderColor={stickied ? moderatorColor : "whiteAlpha.400"}
      py={2}
      bg={boxColor}
      boxShadow="base"
      rounded="md"
      mt="3"
      px={["3", "4"]}
      key={id}
      fontWeight="700"
    >
      {/* Comment info */}
      <HStack>
        <Button
          size="xs"
          onClick={() =>
            setDisplayBody((prevState) =>
              prevState === "block" ? "none" : "block"
            )
          }
        >
          <VscCollapseAll />
        </Button>
        <Stack flexWrap="wrap" direction="row">
          <Text as="b" bgColor={authorColor()} px={(is_submitter || distinguished === "moderator") && 2} rounded="md">
            {author}
          </Text>

          <HStack m="0">
            {!score_hidden && (
              <Text as="b" color={ups < 0 ? "red.500" : "gray.500"}>
                {ups && formatScore(ups)} point
                {ups === 1 ? "" : "s"}
              </Text>
            )}
            {score_hidden && (
              <Text as="b" color="gray.500">
                [score hidden]
              </Text>
            )}
            <Text color="gray" as="span" fontSize="sm">
              {moment(created_utc * 1000).fromNow()}
            </Text>
            {stickied && (
              <Text fontSize="sm" color="green.500">
                stickied comment
              </Text>
            )}
          </HStack>
        </Stack>
      </HStack>
      {/* Comment body */}
      <Box display={displayBody}>
        <Box className="comment" maxW={textMaxWidth} fontSize={"0.95rem"}>
          <ReactMarkdown linkTarget="_blank">{body}</ReactMarkdown>
        </Box>
        <HStack>
          <NextLink href={`${router.asPath}/${id}`} passHref legacyBehavior>
            <Link color="gray.500" fontSize={["xs", "xs", "sm"]}>
              permalink
            </Link>
          </NextLink>
          {/* Show/Hide Child Comments */}
          {getTotalChildComments(item) > 0 && depth < 3 && (
            <Link
              onClick={toggleReplies}
              color="gray.500"
              fontSize={["xs", "xs", "sm"]}
              userSelect="none"
            >
              {!showReplies
                ? `show ${
                    getTotalChildComments(item) !== 0
                      ? `${getTotalChildComments(item)} `
                      : ""
                  }`
                : "hide "}
              {replies?.length === 1 ? "child comment" : "child comments"}
            </Link>
          )}
          {depth >= 3 && replies && (
            <NextLink href={`${router.asPath}/${id}`} passHref legacyBehavior>
              <Link
                color="teal.500"
                fontSize={["xs", "xs", "sm"]}
                fontWeight="bold"
              >
                continue this thread -&gt;
              </Link>
            </NextLink>
          )}
        </HStack>
        {showReplies &&
          depth < 3 &&
          replies &&
          children.map(renderChildComment)}
        {showReplies && moreComments && moreComments.map(renderChildComment)}
      </Box>
    </Box>
  );
}

export default Comment;
