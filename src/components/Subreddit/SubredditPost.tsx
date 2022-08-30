/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Center,
  Link,
  Grid,
  Text,
  useColorModeValue,
  Wrap,
  chakra,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { FaRegSurprise } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { formatScore } from "src/helpers";
import { PostData } from "./types";
import NextLink from "next/link";
import DragToResizeImage from "../Images/DragToResizeImage";

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
  const [showImage, setShowImage] = useState(false);
  const boxColor = useColorModeValue("#e6ecf092", "gray.800");
  const textColor = useColorModeValue("green.400", "green.400");
  const nsfwBorderColor = useColorModeValue("red.500", "red.700");
  const linkFlairColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
      w="100%"
      mb="5"
      py={1}
      px={1}
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
        <Center fontSize={["xs", "sm", "md"]}>
          <b>{formatScore(score)}</b>
        </Center>

        {/* Thumbnail */}
        {thumbnail !== "self" &&
          thumbnail !== "default" &&
          thumbnail !== "nsfw" &&
          thumbnail !== "spoiler" &&
          thumbnail && (
            <Center
              cursor={
                url_overridden_by_dest?.match(/^.*\.(jpg|JPG|png|PNG)$/) &&
                "pointer"
              }
              onClick={() => {
                if (url_overridden_by_dest.match(/^.*\.(jpg|JPG|png|PNG)$/)) {
                  setShowImage((prevState) => !prevState);
                }
              }}
            >
              <img src={thumbnail} alt={title} />
            </Center>
          )}

        {/* Spoiler */}
        {thumbnail === "spoiler" && (
          <Center>
            <Link
              href={url_overridden_by_dest ? url_overridden_by_dest : permalink}
              target="_blank"
            >
              <FaRegSurprise size="1.8rem" color="hsl(31, 100%, 50%)" />
            </Link>
          </Center>
        )}

        {/* Placeholder if no thumbnail exists */}
        {(thumbnail === "self" ||
          thumbnail === "default" ||
          thumbnail === "nsfw" ||
          !thumbnail) && (
          <Center
            w="100%"
            h="100%"
            m="0"
            userSelect="none"
            cursor="pointer"
            onClick={() => setShowSelfText((prevState) => !prevState)}
          >
            {showSelfText ? (
              <IoIosCloseCircleOutline size="1.8rem" />
            ) : (
              <ImFileText2 size="1.8rem" />
            )}
          </Center>
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
                  // rounded="md"
                  px={1}
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
          <Box fontSize="sm">
            <NextLink passHref href={permalink}>
              <Link color="gray.500">
                <Text as="b">{num_comments} comments</Text>
              </Link>
            </NextLink>
          </Box>
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
      {showImage && (
        <Grid
          w="100%"
          px={1}
          columnGap={3}
          templateColumns="minMax(2.5rem, 1fr) minMax(3rem, 1fr) 16fr"
          align={["start", "start", "center"]}
        >
          <div />
          <div />
          <DragToResizeImage
            url={url_overridden_by_dest}
            alt="subreddit-post-image"
          />
        </Grid>
      )}
    </Box>
  );
}

export default Post;
