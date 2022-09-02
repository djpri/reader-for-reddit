/* eslint-disable @next/next/no-img-element */
import { Box, Center, Grid, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { formatScore } from "src/helpers";
import DragToResizeImage from "../../Images/DragToResizeImage";
import { PostData } from "../types";
import TitleAuthorAndComments from "./PostDetails";
import Thumbnail from "./Thumbnail";

interface IProps {
  postData: PostData | null;
}

function Post({ postData }: IProps) {
  const { score, over_18, selftext, url_overridden_by_dest } = postData;
  const [showSelfText, setShowSelfText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const boxColor = useColorModeValue("#e6ecf092", "gray.800");
  const nsfwBorderColor = useColorModeValue("red.500", "red.700");
  const gridTemplate = "minMax(2.5rem, 1fr) minMax(3rem, 1fr) 16fr";

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
        templateColumns={gridTemplate}
        align={["start", "start", "center"]}
      >
        {/* Score */}
        <Center fontSize={["xs", "sm", "md"]}>
          <b>{formatScore(score)}</b>
        </Center>

        <Thumbnail
          postData={postData}
          setShowImage={setShowImage}
          showSelfText={showSelfText}
          setShowSelfText={setShowSelfText}
        />

        <TitleAuthorAndComments postData={postData} />
      </Grid>
      {selftext && showSelfText && (
        <Grid
          w="100%"
          px={1}
          columnGap={3}
          templateColumns={gridTemplate}
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
