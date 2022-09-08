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
  const data = item.data;
  const [showReplies, setShowReplies] = useState(showChildren);
  const [moreComments, setMoreComments] = useState(null);
  const [moreCommentsLoading, setMoreCommentsLoading] = useState(null);
  false;
  const [displayBody, setDisplayBody] = useState(
    data.ups < 0 ? "none" : "block"
  );
  const loadMoreCommentsColor = useColorModeValue("gray.200", "gray.700");
  const moderatorColor = useColorModeValue("green.200", "green.500");
  const opColor = useColorModeValue("blue.100", "blue.600");
  const boxColor = useColorModeValue(
    data.depth % 2 === 0 ? "gray.100" : "white",
    data.depth % 2 === 0 ? "gray.800" : "gray.900"
  );

  const router = useRouter();

  const authorColor = useMemo(() => {
    if (data.distinguished === "moderator") {
      return moderatorColor;
    }
    if (data.is_submitter) {
      return opColor;
    }
  }, [data, moderatorColor, opColor]);

  const getMoreChildren = async (children: []) => {
    setMoreCommentsLoading(true);
    const result: any = await getMoreChildrenComments(data.parent_id, children);
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
      <Comment item={item} key={index} showChildren={false} linkId={linkId} />
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
      border={data.stickied ? "2px" : "1px"}
      borderColor={data.stickied ? moderatorColor : "whiteAlpha.400"}
      pt="3"
      bg={boxColor}
      pb="3"
      boxShadow="base"
      rounded="md"
      mt="3"
      px={["3", "4", "5"]}
      key={data.id}
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
          <Text as="b" bgColor={authorColor}>
            {data.author}
          </Text>

          <HStack m="0">
            {!data.score_hidden && (
              <Text as="b" color={data.ups < 0 ? "red.500" : "gray.500"}>
                {data.ups && formatScore(data.ups)} point
                {data.ups === 1 ? "" : "s"}
              </Text>
            )}
            {data.score_hidden && (
              <Text as="b" color="gray.500">
                [score hidden]
              </Text>
            )}
            <Text color="gray" as="span" fontSize="sm">
              {moment(data.created_utc * 1000).fromNow()}
            </Text>
            {data.stickied && (
              <Text fontSize="sm" color="green.500">
                stickied comment
              </Text>
            )}
          </HStack>
        </Stack>
      </HStack>
      {/* Comment body */}
      <Box display={displayBody}>
        <Box className="comment">
          <ReactMarkdown linkTarget="_blank">{data.body}</ReactMarkdown>
        </Box>
        <HStack>
          <NextLink href={`${router.asPath}/${data.id}`} passHref>
            <Link color="gray.500" fontSize={["xs", "xs", "sm"]}>
              permalink
            </Link>
          </NextLink>
          {/* Show/Hide Child Comments */}
          {getTotalChildComments(item) > 0 && data.depth < 3 && (
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
              {data?.replies?.length === 1 ? "child comment" : "child comments"}
            </Link>
          )}
          {data.depth >= 3 && data.replies && (
            <NextLink href={`${router.asPath}/${data.id}`} passHref>
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
          data.depth < 3 &&
          data.replies &&
          children.map(renderChildComment)}
        {showReplies && moreComments && moreComments.map(renderChildComment)}
      </Box>
    </Box>
  );
}

export default Comment;
