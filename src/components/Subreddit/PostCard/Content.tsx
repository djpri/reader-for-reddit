import { Box, Grid } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import DragToResizeImage from "src/components/Images/DragToResizeImage";
import ReactHlsPlayer from "src/components/ReactHlsPlayer";
import { PostData } from "../types";
import ReactHtmlParser from "react-html-parser";
import * as DOMPurify from "dompurify";

interface IProps {
  showSelfText: boolean;
  gridTemplate: string;
  showImage: boolean;
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
}: IProps) {
  const { selftext, url_overridden_by_dest, media, secure_media_embed } =
    postData;
  if (selftext && showSelfText) {
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
          <ReactMarkdown linkTarget="_blank">{selftext}</ReactMarkdown>
        </Box>
      </Grid>
    );
  }

  if (showEmbeddedContent && secure_media_embed.content) {
    const sanitizedContent = DOMPurify.sanitize(secure_media_embed.content, {
      ALLOWED_TAGS: ["iframe"],
      ALLOWED_ATTR: ["src", "width", "height"],
    });
    console.log(sanitizedContent);
    return (
      <Grid
        h="50vh"
        px={1}
        columnGap={3}
        templateColumns="minMax(2.5rem, 1fr) minMax(3rem, 1fr) 16fr"
        align={["start", "start", "center"]}
      >
        <div />
        <div />
        {ReactHtmlParser(sanitizedContent)}
      </Grid>
    );
  }

  if (showVideo) {
    return (
      <Grid
        w="100%"
        px={1}
        columnGap={3}
        templateColumns="minMax(2.5rem, 1fr) minMax(3rem, 1fr) 16fr"
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
    );
  }

  return null;
}

export default Content;
