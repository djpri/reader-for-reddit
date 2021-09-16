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

function Comment({ item, depth, showChildren }) {
  const [showReplies, setShowReplies] = useState(showChildren);
  const repliesRef = useRef();

  const boxColor = useColorModeValue(
    depth % 2 === 0 ? "#e6ecf092" : "white",
    depth % 2 === 0 ? "gray.800" : "gray.900"
  );

  const renderChildComment = (item, index) => {
    return <Comment item={item} index={index} depth={depth + 1} />;
  };

  const getTotalChildComments = (replies) => {
    const jsonString = JSON.stringify(replies);
    const matches = jsonString.match(/"id"/g).length;
    return matches;
  };

  const toggleReplies = () => setShowReplies((prevState) => !prevState);

  return (
    <Stack
      ml={(depth - 1) * 4}
      direction="row"
      pt="3"
      bg={boxColor}
      pb="3"
      // border="1px solid gray"
      // borderRadius="4"
      boxShadow="base"
      rounded="md"
      mb="3"
      mr="3"
      mt="3"
      pr="5"
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
          {item.replies.length > 0 && depth < 4 && (
            <Link onClick={toggleReplies} color="gray.500" fontSize="sm">
              {/* {`showReplies: ${showReplies}`} */}
              {showReplies
                ? `show ${getTotalChildComments(item.replies)} `
                : "hide "}
              {item.replies.length === 1 ? "child comment" : "child comments"}
            </Link>
          )}
          {depth >= 4 && (
            <Link color="teal.500" fontSize="sm" fontWeight="bold">
              continue this thread -&gt;
            </Link>
          )}
        </HStack>
        {!showReplies && depth < 4 && item.replies.map(renderChildComment)}
      </Box>
    </Stack>
  );
}

export default Comment;
