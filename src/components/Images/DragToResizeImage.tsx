import { Box, chakra } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  url: string;
  alt: string;
}

function DragToResizeImage({ url, alt }: IProps) {
  const imageRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [initialWidth, setInitialWidth] = useState(0);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const currentWidth = initialWidth;
      const deltaX: number = event.clientX - initialPosition[0];
      const deltaY: number = event.clientY - initialPosition[1];
      let multiplier: number = 1;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        multiplier = deltaX / Math.abs(deltaX);
      } else {
        multiplier = deltaY / Math.abs(deltaY);
      }

      const diagonal: number = Math.round(
        Math.hypot(deltaX, deltaY) * multiplier
      );
      const initialDiagonal: number = Math.round(
        Math.hypot(initialPosition[0], initialPosition[1])
      );
      const finalWidth: number = (diagonal / initialDiagonal) * currentWidth;

      imageRef.current.style.width = `${currentWidth + finalWidth * 1.6}px`;
    };
    if (isDragging) {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", () => {
        setIsDragging(false);
      });
    }
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.addEventListener("mouseup", () => {
        setIsDragging(false);
      });
    };
  }, [isDragging, initialPosition, initialWidth]);
  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
        setInitialPosition([e.clientX, e.clientY]);
        setInitialWidth(imageRef.current.clientWidth);
        setIsDragging(true);
      }}
      maxW="100%"
    >
      <chakra.img
        ref={imageRef}
        src={url}
        alt={alt}
        cursor="pointer"
        draggable="false"
        minW="10vw"
        w="30vw"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      />
    </Box>
  );
}

export default DragToResizeImage;
