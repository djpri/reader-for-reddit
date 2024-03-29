/* eslint-disable @next/next/no-img-element */
import { Box, Grid } from "@chakra-ui/react";
import * as DOMPurify from "dompurify";
import DragToResizeImage from "src/components/Images/DragToResizeImage";
import ReactHlsPlayer from "src/components/ReactHlsPlayer";
import { textMaxWidth } from "src/constants";
import { PostData } from "../types";
import ImageGallery from "./ImageGallery";
import parse from 'html-react-parser';

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
    domain,
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
        alignItems={["start", "start", "center"]}
      >
        <div />
        <div />
        <Box
          className="comment"
          overflowX="auto"
          fontSize="0.95rem"
          maxW={textMaxWidth}
        >
          <hr />
          {parse(sanitizedSelfText)}
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
    return (
      <Grid
        px={1}
        columnGap={3}
        templateColumns={gridTemplate}
        alignItems={["start", "start", "center"]}
        maxW="100%"
        my={2}
      >
        <div />
        <div />
        <Box
          position="relative"
          width={domain !== "twitter.com" && secure_media_embed?.width}
          height={domain !== "twitter.com" && secure_media_embed?.height}
          maxH={domain !== "twitter.com" && "50vh"}
          maxW="100%"
          overflowY="auto"
          className="comment"
        >
          {parse(sanitizedContent)}
        </Box>
      </Grid>
    );
  }

  if (showGallery) {
    return (
      <Grid
        w="100%"
        px={1}
        columnGap={3}
        templateColumns={gridTemplate}
        alignItems={["start", "start", "center"]}
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
        alignItems={["start", "start", "center"]}
      >
        <div />
        <div />
        {media?.reddit_video && (
          <ReactHlsPlayer
            src={media.reddit_video.hls_url}
            autoPlay
            controls
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
        alignItems={["start", "start", "center"]}
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
