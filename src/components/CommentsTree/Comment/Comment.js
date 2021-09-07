import {
  Box,
  Text,
  Stack,
  Link,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { VscCollapseAll } from "react-icons/vsc";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

function Comment({ item, index, depth, showChildren }) {
  const [showReplies, setShowReplies] = useState(showChildren);
  const repliesRef = useRef();

  // Here's the signature
  const boxColor = useColorModeValue(
    depth % 2 === 0 ? "gray.50" : "gray.100",
    depth % 2 === 0 ? "gray.800" : "gray.900"
  );

  // Here's the signature
  // const boxColor = useColorModeValue("gray.800", "red.900");

  const renderChildComment = (item, index) => {
    return <Comment item={item} index={index} depth={depth + 1} />;
  };

  const toggleReplies = () => setShowReplies((prevState) => !prevState);

  return (
    <Stack
      key={index}
      ml={(depth - 1) * 4}
      direction="row"
      pt="3"
      bg={boxColor}
      pb="3"
      border="1px solid gray"
      borderRadius="5"
      mb="3"
      mr="3"
      mt="3"
      h="auto"
    >
      {/* <Text>{`Depth ${depth}`}</Text> */}
      <Box bg="gray.500" h="100%" mr="5"></Box>
      <Box>
        <HStack>
          <VscCollapseAll />
          <Text as="b">{item.author}</Text>{" "}
          <Text as="span" color="gray.500">
            {item.ups} points
          </Text>
        </HStack>
        {item.ups > 0 ? (
          <Box className="comment">
            <ReactMarkdown>{item.body}</ReactMarkdown>
          </Box>
        ) : (
          // <ReactMarkdown>*React-Markdown* is **Awesome**</ReactMarkdown>
          <Text color="red.500">
            too many downdogs to even show this comment
          </Text>
        )}
        <HStack>
          <Link color="gray.500" fontSize="sm">
            permalink
          </Link>
          <Link color="gray.500" fontSize="sm">
            reply
          </Link>
          {item.replies.length > 0 && (
            <Link onClick={toggleReplies} color="gray.500" fontSize="sm">
              {showReplies ? `show ${item.replies.length} ` : "hide "}
              {item.replies.length === 1 ? "child comment" : "child comments"}
            </Link>
          )}
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
