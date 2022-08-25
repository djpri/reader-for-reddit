/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { ImFileText2 } from "react-icons/im";
import { formatScore } from "src/helpers";
import styles from "styles/Home.module.css";
import Comments from "../Post/Comments";
import { PostData } from "./types";

interface IProps {
  postData: PostData | null;
}

function Post({ postData }: IProps) {
  const {
    score,
    thumbnail,
    created,
    author,
    title,
    permalink,
    num_comments,
    over_18,
  } = postData;

  const boxColor = useColorModeValue("#e6ecf092", "gray.800");
  const nsfwBorderColor = useColorModeValue("red.500", "red.700");

  return (
    <Box
      className={styles.post}
      boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
      w="100%"
      mb="5"
      bgColor={boxColor}
      borderTopWidth="2px"
      borderColor={over_18 ? nsfwBorderColor : "whiteAlpha.400"}
      borderRadius="sm"
    >
      <Stack
        spacing="15px"
        align={["start", "start", "center"]}
        direction={["row", "row", "row"]}
      >
        {/* Score */}
        <VStack w={["5%", "5%", "5%"]}>
          {/* <Button size="xs">
            <FaArrowUp />
          </Button> */}
          <Text fontSize="1rem">
            <b>{formatScore(score)}</b>
          </Text>
          {/* <Button size="xs">
            <FaArrowDown />
          </Button> */}
        </VStack>

        {/* Thumbnail */}
        {thumbnail !== "self" &&
          thumbnail !== "default" &&
          thumbnail !== "nsfw" &&
          thumbnail && (
            <Box w="70px">
              <img src={thumbnail} alt={title} />
            </Box>
          )}

        {/* Placeholder if no thumbnail exists */}
        {(thumbnail === "self" ||
          thumbnail === "default" ||
          thumbnail === "nsfw" ||
          !thumbnail) && (
          <Flex
            w="70px"
            h="70px"
            justify="center"
            alignItems="center"
            border="1px"
            borderColor="whiteAlpha.400"
          >
            <ImFileText2 size="2rem" />
          </Flex>
        )}

        {/* Author and time submitted */}
        <Box w={["100%", "100%", "95%"]}>
          <Box w="100%" mb="2">
            <Link passHref={true} href={permalink}>
              <a>
                <Text size="md" fontWeight="500">
                  {title}
                </Text>
              </a>
            </Link>
            <Box fontSize="sm">
              <Text color="gray" as="span">
                submitted {moment(created * 1000).fromNow()} by
              </Text>{" "}
              <Text as="span">{author}</Text>
            </Box>
          </Box>
          <Comments num_comments={num_comments} permalink={permalink} />
        </Box>
      </Stack>
    </Box>
  );
}

export default Post;
