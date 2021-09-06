import { Box, Link, HStack, Text } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";

function Comments({ num_comments, permalink }) {
  return (
    <Box>
      <Link href={`https://www.reddit.com${permalink}`} color="teal.500">
        <Text as="b">{num_comments} comments</Text>
      </Link>
    </Box>
  );
}

export default Comments;
