import React from "react";
import {
  Text,
  Box,
  Stack,
  VStack,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import styles from "../../../styles/Home.module.css";
import moment from "moment";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Comments from "./Comments";
import Link from "next/link";

function Post({ postData }) {
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

  const commentNumber = (num) => {
    if (10 < num && num < 100) {
      return (
        <b>
          <span style={{ marginLeft: "5px" }}>*</span>
          {num}
        </b>
      );
    } else if (num > 100) {
      return (
        <b>
          <span style={{ marginLeft: "5px" }}>**</span>
          {num}
        </b>
      );
    } else {
      return <b>{num}</b>;
    }
  };

  if (!postData)
    return (
      <Box className={styles.post} w="100%" mb="5">
        no posts
      </Box>
    );

  return (
    <Box className={styles.post} w="100%" mb="5">
      <Stack
        spacing="10px"
        divider={<StackDivider borderColor="gray.200" />}
        align={["start", "start", "center"]}
        direction={["column", "column", "row"]}
      >
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
        {thumbnail !== "self" && thumbnail !== "default" && thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt={title} />
        )}

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
