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

type CommentType = {
  kind: string;
  data: any;
};

interface IProps {
  item: CommentType;
  showChildren: boolean;
}

function Comment({ item, showChildren }: IProps) {
  const [showReplies, setShowReplies] = useState(showChildren);
  const [displayBody, setDisplayBody] = useState("block");
  const loadMoreCommentsColor = useColorModeValue("gray.200", "gray.700");
  const moderatorColor = useColorModeValue("green.200", "green.500");
  const opColor = useColorModeValue("blue.100", "blue.600");
  const data = item.data;
  const router = useRouter();

  const authorColor = useMemo(() => {
    if (data.distinguished === "moderator") {
      return moderatorColor;
    }
    if (data.is_submitter) {
      return opColor;
    }
  }, [data, moderatorColor, opColor]);

  useEffect(() => {
    setShowReplies(showChildren);
  }, [showChildren]);

  const getChildren = () => {
    if (item.data.replies.data.children[0].kind === "more") {
      return item.data.replies.data.children;
    } else {
      return item.data.replies.data.children;
    }
  };

  const boxColor = useColorModeValue(
    data.depth % 2 === 0 ? "gray.100" : "white",
    data.depth % 2 === 0 ? "gray.800" : "gray.900"
  );

  const renderChildComment = (item: CommentType, index: number) => {
    if (item.kind === "more")
      return (
        <Link
          mt="10px"
          mb="10px"
          color="purple.500"
          fontSize={["xs", "xs", "sm"]}
          display="block"
          _hover={{ bgColor: loadMoreCommentsColor }}
        >
          load {`${item.data.count}`} more comments
        </Link>
      );
    return <Comment item={item} key={index} showChildren={false} />;
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
            <Text as="b" color="gray.500">
              {data.ups && formatScore(data.ups)} point
              {data.ups === 1 ? "" : "s"}
            </Text>
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
        {data.ups > 0 ? (
          <Box className="comment">
            <ReactMarkdown linkTarget="_blank">{data.body}</ReactMarkdown>
          </Box>
        ) : (
          <Text color="red.500">Too many downvotes to show comment</Text>
        )}
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
          getChildren().map(renderChildComment)}
      </Box>
    </Box>
  );
}

export default Comment;
