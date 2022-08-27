/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Center,
  Grid,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { FaRegSurprise } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactMarkdown from "react-markdown";
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
    stickied,
    selftext,
    domain,
    url_overridden_by_dest,
    link_flair_text,
  } = postData;
  const [showSelfText, setShowSelfText] = useState(false);
  const boxColor = useColorModeValue("#e6ecf092", "gray.800");
  const textColor = useColorModeValue("green.400", "green.400");
  const nsfwBorderColor = useColorModeValue("red.500", "red.700");
  const linkFlairColor = useColorModeValue("gray.200", "gray.700");

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
      <Grid
        w="100%"
        px={1}
        columnGap={3}
        templateColumns="minMax(2.5rem, 1fr) minMax(3rem, 1fr) 16fr"
        align={["start", "start", "center"]}
      >
        {/* Score */}
        <Text
          textAlign="center"
          alignSelf="center"
          fontSize={["xs", "sm", "md"]}
        >
          <b>{formatScore(score)}</b>
        </Text>

        {/* Thumbnail */}
        {thumbnail !== "self" &&
          thumbnail !== "default" &&
          thumbnail !== "nsfw" &&
          thumbnail !== "spoiler" &&
          thumbnail && (
            <Box alignSelf="center" justifySelf="center">
              <Link
                href={
                  url_overridden_by_dest ? url_overridden_by_dest : permalink
                }
                passHref
              >
                <a target="_blank">
                  <img src={thumbnail} alt={title} />
                </a>
              </Link>
            </Box>
          )}

        {/* Spoiler */}
        {thumbnail === "spoiler" && (
          <Box alignSelf="center" justifySelf="center">
            <Link
              href={url_overridden_by_dest ? url_overridden_by_dest : permalink}
              passHref
            >
              <a target="_blank">
                <FaRegSurprise size="1.8rem" />
              </a>
            </Link>
          </Box>
        )}

        {/* Placeholder if no thumbnail exists */}
        {(thumbnail === "self" ||
          thumbnail === "default" ||
          thumbnail === "nsfw" ||
          !thumbnail) && (
          <Box
            w="100%"
            h="100%"
            alignSelf="center"
            justifySelf="center"
            m="0"
            userSelect="none"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => setShowSelfText((prevState) => !prevState)}
          >
            {showSelfText ? (
              <IoIosCloseCircleOutline size="1.8rem" />
            ) : (
              <ImFileText2 size="1.8rem" />
            )}
          </Box>
        )}

        {/* Title, Author and time submitted */}
        <Box w={["100%", "100%", "95%"]}>
          <Box mb={1}>
            <Wrap alignItems="center" spacing={2}>
              {link_flair_text && (
                <Center
                  fontSize="xs"
                  bgColor={linkFlairColor}
                  fontWeight="600"
                  rounded="sm"
                  px={2}
                >
                  {link_flair_text}
                </Center>
              )}
              <Link href={permalink} passHref>
                <a>
                  <Text
                    px={0}
                    size="md"
                    fontWeight={stickied ? "700" : "500"}
                    color={stickied && textColor}
                  >
                    {title}
                  </Text>
                </a>
              </Link>
              <Center fontSize="xs" color="gray.500">{`(${domain})`}</Center>
            </Wrap>
            <Box fontSize="sm">
              <Text color="gray" as="span">
                submitted {moment(created * 1000).fromNow()} by
              </Text>{" "}
              <Text as="span">{author}</Text>
            </Box>
          </Box>
          <Comments num_comments={num_comments} permalink={permalink} />
        </Box>
      </Grid>
      {selftext && showSelfText && (
        <Grid
          w="100%"
          px={1}
          columnGap={3}
          templateColumns="minMax(2.5rem, 1fr) minMax(3rem, 1fr) 16fr"
          align={["start", "start", "center"]}
        >
          <div />
          <div />
          <Box className="comment" overflowX="auto">
            <hr />
            <ReactMarkdown linkTarget="_blank">{selftext}</ReactMarkdown>
          </Box>
        </Grid>
      )}
    </Box>
  );
}

export default Post;
