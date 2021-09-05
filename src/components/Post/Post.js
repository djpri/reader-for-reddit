import React from "react";
import { Text, Box, Stack, StackDivider } from "@chakra-ui/react";
import styles from "../../../styles/Home.module.css";
import moment from "moment";

function Post({ postData }) {
  const {
    score,
    thumbnail,
    created,
    author,
    url,
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

  return (
    <Box className={styles.post} w="100%" mb="5">
      <Stack
        spacing="10px"
        divider={<StackDivider borderColor="gray.200" />}
        align={["start", "start", "center"]}
        direction={["column", "column", "row"]}
      >
        <Box w={["100%", "100%", "10%"]}>
          <Text fontSize="1.5rem">
            <b>{score}</b>
          </Text>
        </Box>
        {thumbnail !== "self" && thumbnail !== "default" && thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt={title} />
        )}

        <Box w={["100%", "100%", "90%"]}>
          <Box w="100%" mb="2">
            <a href={url}>
              <b>{title}</b>
            </a>
            <hr />
            <Box>
              <Text color="gray" as="span">
                submitted {moment(created * 1000).fromNow()} by
              </Text>{" "}
              <Text as="span">{author}</Text>
            </Box>
          </Box>
          <Box>
            <a href={`https://www.reddit.com${permalink}`}>
              <Text>{commentNumber(num_comments)} comments</Text>
            </a>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Post;
