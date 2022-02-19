import React from "react";
import { Text, Box, Stack, VStack, Button, Flex } from "@chakra-ui/react";
import styles from "../../../styles/Home.module.css";
import moment from "moment";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import Comments from "./Comments";
import Link from "next/link";
import { PostData } from "../../types/post";

interface IProps {
  postData: PostData;
}

function Post({ postData }: IProps) {
  const {
    score,
    thumbnail,
    created,
    author,
    url,
    id,
    title,
    permalink,
    num_comments,
  } = postData;

  if (!postData)
    return (
      <Box className={styles.post} w="100%" mb="5">
        no posts
      </Box>
    );

  return (
    <Box
      className={styles.post}
      w="100%"
      mb="5"
      border="1px"
      borderColor="whiteAlpha.400"
      borderRadius="sm"
    >
      <Stack
        spacing="15px"
        align={["start", "start", "center"]}
        direction={["column", "column", "row"]}
      >
        {/* Upvote/Downvote */}
        <VStack w={["100%", "100%", "5%"]}>
          <Button size="xs">
            <FaArrowUp />
          </Button>
          <Text fontSize="1rem">
            <b>{score}</b>
          </Text>
          <Button size="xs">
            <FaArrowDown />
          </Button>
        </VStack>

        {/* Thumbnail */}
        {thumbnail !== "self" && thumbnail !== "default" && thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <Box w="70px">
            <img src={thumbnail} alt={title} />
          </Box>
        )}

        {/* Placeholder if no thumbnail exists */}
        {(thumbnail === "self" || thumbnail === "default" || !thumbnail) && (
          <Flex w="70px" h="100%" justify="center">
            <ImFileText2 size="2rem" />
          </Flex>
        )}

        {/* Author and time submitted */}
        <Box w={["100%", "100%", "95%"]}>
          <Box w="100%" mb="2">
            <Link passHref={true} href={`/r/comments/${id}`}>
              <a>
                <b>{title}</b>
              </a>
            </Link>
            <hr />
            <Box>
              <Text color="gray" as="span">
                submitted {moment(created * 1000).fromNow()} by
              </Text>{" "}
              <Text as="span">{author}</Text>
            </Box>
          </Box>
          <Comments num_comments={num_comments} permalink={id} />
        </Box>
      </Stack>
    </Box>
  );
}

export default Post;
