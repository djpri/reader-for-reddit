import { Box, HStack, Text, Link } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";
import NextLink from "next/link";

function Comments({ num_comments, permalink }) {
  return (
    <Box>
      <NextLink passHref href={`/r/comments/${permalink}`}>
        <Link color="teal.500">
          <Text as="b">{num_comments} comments</Text>
        </Link>
      </NextLink>
    </Box>
  );
}

export default Comments;
