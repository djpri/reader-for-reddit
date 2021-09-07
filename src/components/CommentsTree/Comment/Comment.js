import { Box, Text, Stack, Link, HStack } from "@chakra-ui/layout";
import { VscCollapseAll } from "react-icons/vsc";
import { useState, useRef } from "react";

function Comment({ item, index, depth, showChildren }) {
  const [showReplies, setShowReplies] = useState(showChildren);
  const repliesRef = useRef();

  const renderChildComment = (item, index) => {
    return <Comment item={item} index={index} depth={depth + 1} />;
  };

  const toggleReplies = () => setShowReplies((prevState) => !prevState);

  return (
    <Stack
      key={index}
      ml={depth * 4}
      direction="row"
      pt="3"
      pb="3"
      border="1px solid gray"
      borderRadius="10"
      mb="3"
      mr="3"
      mt="3"
      h="auto"
    >
      {/* <Text>{`Depth ${depth}`}</Text> */}
      <Box bg="gray.500" h="100%">
        <VscCollapseAll />
      </Box>
      <Box>
        <Text>
          <Text as="b">{item.author}</Text>{" "}
          <Text as="span" color="gray.500">
            {item.ups} points
          </Text>
        </Text>
        {item.ups > 0 ? (
          <Text>{item.body}</Text>
        ) : (
          <Text color="red.500">
            too many downdogs to even show this comment
          </Text>
        )}
        <HStack>
          <Link onClick={toggleReplies} color="gray.500">
            {showReplies ? `show ${item.replies.length} ` : "hide "}
            {item.replies.length === 1 ? "child comment" : "child comments"}
          </Link>
        </HStack>
        {!showReplies &&
          item.replies !== [] &&
          depth < 4 &&
          item.replies.map(renderChildComment)}
      </Box>
    </Stack>
  );
}

export default Comment;
