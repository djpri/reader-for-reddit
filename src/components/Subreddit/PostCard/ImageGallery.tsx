/* eslint-disable @next/next/no-img-element */
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import DragToResizeImage from "src/components/Images/DragToResizeImage";

interface IProps {
  media_metadata: unknown;
}

function ImageGallery({ media_metadata }: IProps) {
  const imageCount = useMemo(() => {
    return Object.keys(media_metadata).length;
  }, [media_metadata]);
  const [currentImage, setCurrentImage] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImage((prevState) => prevState - 1);
  };
  const goToNextImage = () => {
    setCurrentImage((prevState) => prevState + 1);
  };
  return (
    <Box mt={2}>
      <HStack>
        <IconButton
          onClick={goToPreviousImage}
          disabled={currentImage === 0}
          size="xs"
          icon={<GiPreviousButton />}
          aria-label="Previous Image"
        />
        <Text>
          {currentImage + 1} of {imageCount}
        </Text>
        <IconButton
          onClick={goToNextImage}
          disabled={currentImage === imageCount - 1}
          size="xs"
          icon={<GiNextButton />}
          aria-label="Next Image"
        />
      </HStack>
      {Object.entries(media_metadata).map((image: [string, any], index) => {
        if (currentImage === index) {
          return (
            <DragToResizeImage
              url={image[1]?.p[3].u}
              key={image[0]}
              alt="gallery-item"
            />
          );
        } else {
          return null;
        }
      })}
    </Box>
  );
}

export default ImageGallery;
