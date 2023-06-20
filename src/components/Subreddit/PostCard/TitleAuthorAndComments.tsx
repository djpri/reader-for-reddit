/* eslint-disable @next/next/no-img-element */
import {
  Badge,
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
import Color from "color";
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
    link_flair_background_color,
    link_flair_richtext,
    link_flair_type,
  } = postData;
  const linkFlairColor = useColorModeValue("gray.200", "gray.500");
  const bgColor = useColorModeValue(
    link_flair_background_color ? Color(link_flair_background_color)?.alpha(0.35).lighten(0.8).desaturate(0.2).string() : "gray.200",
    link_flair_background_color ? Color(link_flair_background_color)?.alpha(0.55).lighten(0.2).desaturate(0.2).string() : "gray.500"
  );
  const textColor = useColorModeValue("#008136", "#34a764");
  const flairTextColor = useColorModeValue("black", "white");

  const Author = () => (
    <Box fontSize="sm">
      <Text color="gray" as="span" className="post-time-submitted">
        submitted {moment(created * 1000).fromNow()} by
      </Text>{" "}
      <Text as="span" className="post-author">
        {author}
      </Text>
    </Box>
  );

  const Flair = () => (
    <Badge
      fontSize="xs"
      bgColor={bgColor}
      color={flairTextColor}
      colorScheme="green"
      fontWeight="600"
      // opacity={0.25}
      rounded="sm"
      borderColor={"gray.500"}
      borderWidth={"1px"}
      px={1}
      className="post-flair"
    >
      {link_flair_text}
    </Badge>
  );

  const RichTextFlair = ({ flairInfo }: { flairInfo: any }) => {
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
    <NextLink href={url} passHref legacyBehavior target="_blank" rel="noopener">
      <Link>
        <Heading
          px={0}
          fontSize="md"
          fontWeight={stickied ? "700" : "600"}
          color={stickied && textColor}
          className="post-title"
        >
          {title}
        </Heading>
      </Link>
    </NextLink>
  );

  const NumComments = () => (
    <Box fontSize="sm" className="post-num-comments">
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
