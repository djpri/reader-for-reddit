import {
  Box,
  Center,
  Heading,
  Link,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import moment from "moment";
import NextLink from "next/link";
import { PostData } from "../types";

function TitleAuthorAndComments({ postData }: { postData: PostData }) {
  const {
    created,
    author,
    title,
    permalink,
    num_comments,
    stickied,
    domain,
    link_flair_text,
  } = postData;
  const linkFlairColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("green.400", "green.400");

  const Author = () => (
    <Box fontSize="sm">
      <Text color="gray" as="span">
        submitted {moment(created * 1000).fromNow()} by
      </Text>{" "}
      <Text as="span">{author}</Text>
    </Box>
  );

  const Flair = () => (
    <Center
      fontSize="xs"
      bgColor={linkFlairColor}
      fontWeight="600"
      // rounded="md"
      px={1}
    >
      {link_flair_text}
    </Center>
  );

  const Title = () => (
    <Link href={permalink} passHref>
      <a>
        <Heading
          px={0}
          fontSize="lg"
          fontWeight={stickied ? "700" : "500"}
          color={stickied && textColor}
        >
          {title}
        </Heading>
      </a>
    </Link>
  );

  const NumComments = () => (
    <Box fontSize="sm">
      <NextLink passHref href={permalink}>
        <Link color="gray.500">
          <Text as="b">{num_comments} comments</Text>
        </Link>
      </NextLink>
    </Box>
  );

  return (
    <Box w={["100%", "100%", "95%"]}>
      <Box mb={1}>
        <Wrap alignItems="center" spacing={2}>
          {link_flair_text && <Flair />}
          <Title />
          <Center fontSize="xs" color="gray.500">{`(${domain})`}</Center>
        </Wrap>
        <Author />
      </Box>
      <NumComments />
    </Box>
  );
}

export default TitleAuthorAndComments;
