/* eslint-disable @next/next/no-img-element */
import { Box, Center, Link, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  FaExternalLinkSquareAlt,
  FaImage,
  FaImages,
  FaRegSurprise,
  FaVideo,
} from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SiReddit } from "react-icons/si";
import { PostData } from "../types";

interface IProps {
  postData: PostData;
  setShowImage: Dispatch<SetStateAction<boolean>>;
  showSelfText: boolean;
  setShowSelfText: Dispatch<SetStateAction<boolean>>;
  setShowEmbeddedContent: Dispatch<SetStateAction<boolean>>;
  setShowVideo: Dispatch<SetStateAction<boolean>>;
  setShowGallery: Dispatch<SetStateAction<boolean>>;
}

function Thumbnail({
  postData,
  showSelfText,
  setShowImage,
  setShowSelfText,
  setShowVideo,
  setShowEmbeddedContent,
  setShowGallery,
}: IProps) {
  const {
    title,
    permalink,
    url_overridden_by_dest,
    thumbnail,
    selftext,
    is_video,
    is_gallery,
    secure_media,
  } = postData;
  const iconColor = useColorModeValue("black", "white");
  const imageBgColor = useColorModeValue("blue.200", "blue.600");
  const videoBgColor = useColorModeValue("orange.300", "orange.600");

  const imageContentExists =
    url_overridden_by_dest?.match(/^.*\.(jpg|JPG|jpeg|png|PNG|webp|gif)$/) !==
    null;

  const HoverIcon = ({ icon }: { icon: ReactElement }) => {
    if (icon === null) {
      return null;
    }
    return (
      <Box
        position="absolute"
        bgColor={is_video ? videoBgColor : imageBgColor}
        w="40%"
        p={1}
        bottom="0"
        right="0"
        color={iconColor}
      >
        {icon}
      </Box>
    );
  };

  const MediaThumbnail = () => {
    return (
      <Center
        userSelect="none"
        w="100%"
        h="100%"
        fontSize="xs"
        cursor={(imageContentExists || secure_media || is_video) && "pointer"}
        onClick={() => {
          if (is_video) {
            setShowVideo((prevState) => !prevState);
          }
          if (!is_video && imageContentExists) {
            setShowImage((prevState) => !prevState);
          }
          if (secure_media) {
            setShowEmbeddedContent((prevState) => !prevState);
          }
        }}
        position="relative"
      >
        <HoverIcon
          icon={(() => {
            if (is_video) {
              return <FaVideo size="100%" />;
            }
            if (secure_media) {
              return <FaExternalLinkSquareAlt size="100%" />;
            }
            if (!is_video && imageContentExists) {
              return <FaImage size="100%" />;
            }
            return null;
          })()}
        />
        <img
          src={thumbnail}
          alt={title.length > 30 ? `${title.substring(0, 30)}...` : title}
        />
      </Center>
    );
  };

  const GalleryThumbnail = () => {
    return (
      <Center
        w="100%"
        h="100%"
        cursor="pointer"
        userSelect="none"
        onClick={() => setShowGallery((prevState) => !prevState)}
      >
        {" "}
        <FaImages size="2rem" color={iconColor} />
      </Center>
    );
  };

  const SelfTextThumbnail = () => (
    <Center
      w="100%"
      h="100%"
      m="0"
      userSelect="none"
      cursor="pointer"
      position="relative"
      onClick={() => setShowSelfText((prevState) => !prevState)}
    >
      {showSelfText ? (
        <IoIosCloseCircleOutline size="1.8rem" />
      ) : (
        <ImFileText2 size="1.8rem" />
      )}
    </Center>
  );

  const SpoilerThumbnail = () => (
    <Center w="100%" h="100%">
      <Link
        href={url_overridden_by_dest ? url_overridden_by_dest : permalink}
        target="_blank"
      >
        <FaRegSurprise size="1.8rem" color="hsl(31, 100%, 50%)" />
      </Link>
    </Center>
  );

  const DefaultThumbnail = () => (
    <Center w="100%" h="100%">
      <SiReddit size="1.3rem" />
    </Center>
  );

  if (thumbnail === "spoiler") {
    return <SpoilerThumbnail />;
  }

  // selftext and image are mutually exclusive for submissions
  if (thumbnail === "self" || selftext || thumbnail === "nsfw") {
    return <SelfTextThumbnail />;
  }

  if (thumbnail === "default") {
    return <DefaultThumbnail />;
  }

  if (is_gallery) {
    return <GalleryThumbnail />;
  }

  if (thumbnail.match(/^.*\.(jpg|JPG|jpeg|png|PNG|webp)$/) && !is_gallery) {
    return <MediaThumbnail />;
  }

  return <DefaultThumbnail />;
}

export default Thumbnail;
