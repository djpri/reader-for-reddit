/* eslint-disable @next/next/no-img-element */
import { Box, Center, Grid, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { formatScore } from "src/helpers";
import { PostData } from "../types";
import Content from "./Content";
import Thumbnail from "./Thumbnail";
import TitleAuthorAndComments from "./TitleAuthorAndComments";
import Color from "color";

interface IProps {
  postData: PostData | null;
  selectedId: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedId: (value: string) => void;
}

function Post({ postData, selectedId, setSelectedId }: IProps) {
  const { score, over_18, id } = postData;
  const [showSelfText, setShowSelfText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showEmbeddedContent, setShowEmbeddedContent] = useState(false);
  const nsfwBorderColor = useColorModeValue("red.500", "red.700");
  const gridTemplate = "minMax(2.5rem, 1fr) minMax(3rem, 1fr) 25fr";
  
  const boxColor = useColorModeValue("#e1e1e147", "gray.800");
  const selectedBoxColor = useColorModeValue(Color("#e1e1e147").darken(0.15).toString(), "gray.700");

  const borderColor = () => {
    if (over_18) {
      return nsfwBorderColor;
    }
    return "whiteAlpha.200";
  };

  const bgColor = () => {
    if (selectedId === id) {
      return selectedBoxColor;
    }
    return boxColor;
  };

  return (
    <Box
      boxShadow="rgb(0 0 100 / 6%) 0px 2px 0px, rgb(0 0 0 / 18%) 0px 2px 0px;"
      w="100%"
      mb={3}
      py={1}
      px={1}
      bgColor={bgColor()}
      borderColor={borderColor()}
      borderWidth={"2px"}
      borderRadius="md"
      className="post"
      onClick={() => {
        if (selectedId !== id) {
          setSelectedId(id);
        }
      }}
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
