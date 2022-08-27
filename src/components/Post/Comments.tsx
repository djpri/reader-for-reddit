import { Box, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface IProps {
  num_comments: number;
  permalink: string;
}

function Comments({ num_comments, permalink }: IProps) {
  return (
    <Box fontSize="sm">
      <NextLink passHref href={permalink}>
        <Link color="teal.500">
          <Text as="b">{num_comments} comments</Text>
        </Link>
      </NextLink>
    </Box>
  );
}

export default Comments;
