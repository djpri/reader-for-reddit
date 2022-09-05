/* eslint-disable @next/next/no-img-element */
import { Box, Center, Link, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { FaImage, FaRegSurprise, FaVideo } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SiReddit } from "react-icons/si";
import { PostData } from "../types";

interface IProps {
  postData: PostData;
  setShowImage: Dispatch<SetStateAction<boolean>>;
  showSelfText: boolean;
  setShowSelfText: Dispatch<SetStateAction<boolean>>;
  setShowVideo: Dispatch<SetStateAction<boolean>>;
}

function Thumbnail({
  setShowImage,
  showSelfText,
  setShowSelfText,
  setShowVideo,
  postData,
}: IProps) {
  const {
    title,
    permalink,
    url_overridden_by_dest,
    thumbnail,
    selftext,
    is_video,
  } = postData;
  const iconColor = useColorModeValue("black", "white");
  const imageBgColor = useColorModeValue("blue.200", "blue.600");
  const videoBgColor = useColorModeValue("orange.300", "orange.600");

  const alternativeThumbnail = url_overridden_by_dest?.match(
    /^.*\.(jpg|JPG|jpeg|png|PNG|webp)$/
  )
    ? url_overridden_by_dest
    : null;
  const thumbnailExists = thumbnail !== "" || alternativeThumbnail;

  const HoverIcon = ({ icon }: { icon: ReactElement }) => (
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

  const MediaThumbnail = () => {
    let url = thumbnail || alternativeThumbnail;

    console.log(url);
    return (
      <Center
        userSelect="none"
        w="100%"
        h="100%"
        fontSize="xs"
        cursor={(thumbnailExists || is_video) && "pointer"}
        onClick={() => {
          if (is_video) {
            setShowVideo((prevState) => !prevState);
          }
          if (!is_video && thumbnailExists) {
            setShowImage((prevState) => !prevState);
          }
        }}
        position="relative"
      >
        <HoverIcon
          icon={is_video ? <FaVideo size="100%" /> : <FaImage size="100%" />}
        />
        <img
          src={url}
          alt={title.length > 30 ? `${title.substring(0, 30)}...` : title}
        />
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
      postion="relative"
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
  if (thumbnail === "self" || thumbnail === "nsfw" || selftext) {
    return <SelfTextThumbnail />;
  }

  if (thumbnail === "default") {
    return <DefaultThumbnail />;
  }

  if (thumbnailExists) {
    return <MediaThumbnail />;
  }

  return <DefaultThumbnail />;
}

export default Thumbnail;
