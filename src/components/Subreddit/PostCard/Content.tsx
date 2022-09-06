/* eslint-disable @next/next/no-img-element */
import { Box, Grid } from "@chakra-ui/react";
import * as DOMPurify from "dompurify";
import ReactHtmlParser from "react-html-parser";
import DragToResizeImage from "src/components/Images/DragToResizeImage";
import ReactHlsPlayer from "src/components/ReactHlsPlayer";
import { PostData } from "../types";
import ImageGallery from "./ImageGallery";

interface IProps {
  showSelfText: boolean;
  gridTemplate: string;
  showImage: boolean;
  showGallery: boolean;
  postData: PostData;
  showVideo: boolean;
  showEmbeddedContent: boolean;
}

function Content({
  showSelfText,
  gridTemplate,
  showImage,
  postData,
  showVideo,
  showEmbeddedContent,
  showGallery,
}: IProps) {
  const {
    selftext,
    selftext_html,
    url_overridden_by_dest,
    media,
    secure_media_embed,
    media_metadata,
  } = postData;

  if (selftext && showSelfText) {
    const sanitizedSelfText = DOMPurify.sanitize(selftext_html) || selftext;
    return (
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
          {ReactHtmlParser(sanitizedSelfText, {
            transform(node: {
              type: string;
              name: string;
              attribs: { target: string };
            }) {
              if (node.type === "tag" && node.name === "a") {
                node.attribs.target = "_blank";
              }
            },
          })}
        </Box>
      </Grid>
    );
  }

  if (showEmbeddedContent && secure_media_embed.content) {
    const sanitizedContent = DOMPurify.sanitize(secure_media_embed.content, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "frameborder",
        "allowFullScreen",
        "autoplay",
        "encrypted-media",
        "picture-in-picture",
        "allowFullScreen",
      ],
    });
    console.log(sanitizedContent);
    return (
      <Grid
        px={1}
        columnGap={3}
        templateColumns={gridTemplate}
        align={["start", "start", "center"]}
        maxW="100%"
      >
        <div />
        <div />
        <Box
          position="relative"
          width={secure_media_embed?.width}
          height={secure_media_embed?.height}
          maxH="50vh"
          maxW="100%"
          overflowY="auto"
        >
          {ReactHtmlParser(sanitizedContent)}
        </Box>
      </Grid>
    );
  }

  if (showGallery) {
    console.log(media_metadata);
    return (
      <Grid
        w="100%"
        px={1}
        columnGap={3}
        templateColumns={gridTemplate}
        align={["start", "start", "center"]}
      >
        <div />
        <div />
        <ImageGallery media_metadata={media_metadata} />
      </Grid>
    );
  }

  if (showVideo) {
    return (
      <Grid
        w="100%"
        px={1}
        columnGap={3}
        templateColumns={gridTemplate}
        align={["start", "start", "center"]}
      >
        <div />
        <div />
        {media.reddit_video && (
          <ReactHlsPlayer
            src={media.reddit_video.hls_url}
            autoPlay={true}
            controls={true}
            width="30%"
            height="auto"
          />
        )}
      </Grid>
    );
  }

  if (showImage) {
    return (
      <Grid
        w="100%"
        px={1}
        columnGap={3}
        templateColumns={gridTemplate}
        align={["start", "start", "center"]}
      >
        <div />
        <div />
        <DragToResizeImage
          url={url_overridden_by_dest}
          alt="subreddit-post-image"
        />
      </Grid>
    );
  }

  return null;
}

export default Content;
