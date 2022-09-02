/* eslint-disable @next/next/no-img-element */
import { Center, Link } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaRegSurprise } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PostData } from "../types";

interface IProps {
  postData: PostData;
  setShowImage: Dispatch<SetStateAction<boolean>>;
  showSelfText: boolean;
  setShowSelfText: Dispatch<SetStateAction<boolean>>;
}

function Thumbnail({
  setShowImage,
  showSelfText,
  setShowSelfText,
  postData,
}: IProps) {
  const { title, permalink, url_overridden_by_dest, thumbnail } = postData;

  const ImageThumbnail = () => (
    <Center
      fontSize="xs"
      cursor={
        url_overridden_by_dest?.match(/^.*\.(jpg|JPG|png|PNG)$/) && "pointer"
      }
      onClick={() => {
        if (url_overridden_by_dest.match(/^.*\.(jpg|JPG|png|PNG)$/)) {
          setShowImage((prevState) => !prevState);
        }
      }}
    >
      <img src={thumbnail} alt={title} />
    </Center>
  );

  const SelfTextThumbnail = () => (
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
  );

  const SpoilerThumbnail = () => (
    <Center>
      <Link
        href={url_overridden_by_dest ? url_overridden_by_dest : permalink}
        target="_blank"
      >
        <FaRegSurprise size="1.8rem" color="hsl(31, 100%, 50%)" />
      </Link>
    </Center>
  );

  return (
    <div>
      {/* Image Thumbnail */}
      {thumbnail !== "self" &&
        thumbnail !== "default" &&
        thumbnail !== "nsfw" &&
        thumbnail !== "spoiler" &&
        thumbnail && <ImageThumbnail />}
      {/* Default */}
      {thumbnail === "default" && null}
      {/* Spoiler */}
      {thumbnail === "spoiler" && <SpoilerThumbnail />}
      {/* Placeholder if no thumbnail exists */}
      {(thumbnail === "self" || thumbnail === "nsfw" || !thumbnail) && (
        <SelfTextThumbnail />
      )}
    </div>
  );
}

export default Thumbnail;
