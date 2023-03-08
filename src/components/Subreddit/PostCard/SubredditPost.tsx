/* eslint-disable @next/next/no-img-element */
import { Box, Center, Grid, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { formatScore } from "src/helpers";
import { PostData } from "../types";
import Content from "./Content";
import Thumbnail from "./Thumbnail";
import TitleAuthorAndComments from "./TitleAuthorAndComments";

interface IProps {
  postData: PostData | null;
}

function Post({ postData }: IProps) {
  const { score, over_18 } = postData;
  const [showSelfText, setShowSelfText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showEmbeddedContent, setShowEmbeddedContent] = useState(false);
  const boxColor = useColorModeValue("#e6ecf092", "gray.800");
  const nsfwBorderColor = useColorModeValue("red.500", "red.700");
  const gridTemplate = "minMax(2.5rem, 1fr) minMax(3rem, 1fr) 25fr";

  return (
    <Box
      boxShadow="rgb(0 0 0 / 6%) 0px 1px 4px, rgb(0 0 0 / 18%) 0px 3px 3px"
      w="100%"
      mb="5"
      py={1}
      px={1}
      bgColor={boxColor}
      borderColor={over_18 ? nsfwBorderColor : "whiteAlpha.400"}
      borderTopWidth={over_18 && "2px"}
      borderRadius="sm"
    >
      <Grid
        w="100%"
        px={1}
        columnGap={3}
        templateColumns={gridTemplate}
        alignItems={["center"]}
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
          setShowVideo={setShowVideo}
          setShowEmbeddedContent={setShowEmbeddedContent}
          setShowGallery={setShowGallery}
        />

        <TitleAuthorAndComments postData={postData} />
      </Grid>
      <Content
        postData={postData}
        showSelfText={showSelfText}
        gridTemplate={gridTemplate}
        showImage={showImage}
        showVideo={showVideo}
        showEmbeddedContent={showEmbeddedContent}
        showGallery={showGallery}
      />
    </Box>
  );
}

export default Post;
