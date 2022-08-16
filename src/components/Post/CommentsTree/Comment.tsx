import {
  Box,
  Button,
  Text,
  Stack,
  Link,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { VscCollapseAll } from "react-icons/vsc";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";


function Comment({ item, showChildren }) {
  const [showReplies, setShowReplies] = useState(showChildren);
  const [displayBody, setDisplayBody] = useState("block");

  useEffect(() => {
    setShowReplies(showChildren);
  }, [showChildren]);

  const getChildren = () => {
    if (item.replies.data.children[0].kind === "more") {
      return item.replies.data.children;
    } else {
      return item.replies.data.children;
    }
  };

  const boxColor = useColorModeValue(
    item.depth % 2 === 0 ? "#e6ecf092" : "white",
    item.depth % 2 === 0 ? "gray.800" : "gray.900"
  );

  const renderChildComment = (item, index) => {
    const isOfKindMore = item.data.children;
    if (isOfKindMore)
      return (
        <Link
          mt="10px"
          mb="10px"
          pl="5px"
          color="purple.500"
          fontSize={["xs", "xs", "sm"]}
          display="block"
          _hover={{ bgColor: "gray.300" }}
        >
          load more comments
        </Link>
      );
    return <Comment item={item.data} key={index} showChildren={false} />;
  };

  const getTotalChildComments = (replies: []) => {
    const jsonString = JSON.stringify(replies);
    const matches = jsonString.match(/"id"/g).length;
    return matches;
  };

  const toggleReplies = () => setShowReplies((prevState) => !prevState);

  return (
    <Stack
      display="block"
      // ml={(item.depth - 1) * 5}
      direction="row"
      border="1px"
      borderColor="whiteAlpha.400"
      pt="3"
      bg={boxColor}
      pb="3"
      boxShadow="base"
      // rounded="md"
      mt="3"
      pl={["1", "2", "3", "4"]}
      pr="5"
      h="auto"
      key={item.id}
    >
      {/* Sidebar for padding */}
      <Box bg="gray.500" h="100%" mr={[1, 3, 5]}></Box>
      <Box>
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
          <Text as="b">{item.author}</Text>{" "}
          <Text as="span" color="gray.500">
            {item.ups} points
          </Text>
        </HStack>
        {/* Comment body */}
        <Box display={displayBody}>
          {item.ups > 0 ? (
            <Box className="comment">
              <ReactMarkdown linkTarget="_blank">{item.body}</ReactMarkdown>
            </Box>
          ) : (
            <Text color="red.500">
              too many downdogs to even show this comment
            </Text>
          )}
          <HStack>
            <Link color="gray.500" fontSize={["xs", "xs", "sm"]}>
              permalink
            </Link>
            <Link color="gray.500" fontSize={["xs", "xs", "sm"]}>
              reply
            </Link>
            {item?.replies?.data?.children?.length > 0 && item.depth < 3 && (
              <Link
                onClick={toggleReplies}
                color="gray.500"
                fontSize={["xs", "xs", "sm"]}
              >
                {!showReplies
                  ? `show ${getTotalChildComments(item.replies.data.children)} `
                  : "hide "}
                {item.replies.length === 1 ? "child comment" : "child comments"}
              </Link>
            )}
            {item.depth >= 3 && item.replies && (
              <Link
                color="teal.500"
                fontSize={["xs", "xs", "sm"]}
                fontWeight="bold"
              >
                continue this thread -&gt;
              </Link>
            )}
          </HStack>
          {showReplies &&
            item.depth < 3 &&
            item.replies &&
            getChildren().map(renderChildComment)}
        </Box>
      </Box>
    </Stack>
  );
}

export default Comment;
