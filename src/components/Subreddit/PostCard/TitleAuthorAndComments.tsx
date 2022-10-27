/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Center,
  chakra,
  Heading,
  HStack,
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
    url,
    permalink,
    num_comments,
    stickied,
    domain,
    link_flair_text,
    link_flair_richtext,
    link_flair_type,
  } = postData;
  const linkFlairColor = useColorModeValue("gray.200", "gray.500");
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

  const RichTextFlair = ({ flairInfo }: { flairInfo: unknown }) => {
    return (
      <Center
        fontSize="xs"
        bgColor={linkFlairColor}
        fontWeight="600"
        // rounded="md"
        px={1}
      >
        <chakra.img
          src={flairInfo[0]?.u}
          alt={flairInfo[0]?.a}
          w="1rem"
          mr={1}
        />
        {flairInfo[1]?.e === "text" && flairInfo[1]?.t}
      </Center>
    );
  };

  const Title = () => (
    <Link href={url} passHref legacyBehavior target="_blank" rel="noopener">
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
      <NextLink passHref legacyBehavior href={permalink}>
        <Link color="gray.500">
          <Text as="b">{num_comments} comments</Text>
        </Link>
      </NextLink>
    </Box>
  );

  return (
    <Box w={["100%", "100%", "95%"]}>
      <Wrap alignItems="center" spacing={2}>
        {link_flair_richtext.length === 1 &&
          link_flair_type === "richtext" &&
          link_flair_text && <Flair />}
        {link_flair_richtext.length === 2 &&
          link_flair_type === "richtext" &&
          link_flair_richtext && (
            <RichTextFlair flairInfo={link_flair_richtext} />
          )}
        <Title />
        <Center fontSize="xs" color="gray.500">{`(${domain})`}</Center>
      </Wrap>
      <HStack>
        <div>
          <Author />
          <NumComments />
        </div>
      </HStack>
    </Box>
  );
}

export default TitleAuthorAndComments;
