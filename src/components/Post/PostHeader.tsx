/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  chakra,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { SortType } from "src/types/sortTypes";

const sortNames = {
  confidence: "Best",
  top: "Top",
  new: "New",
  controversial: "Controversial",
  old: "Old",
  random: "Random",
  qa: "Q&A",
};

interface IProps {
  postDetails: any;
  showChildComments: boolean;
  toggleAllChildComments: () => void;
  sortType: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
}

function PostHeader({
  postDetails,
  showChildComments,
  toggleAllChildComments,
  sortType,
  setSort,
}: IProps) {
  const { num_comments, title, selftext, subreddit, url } = postDetails;
  const bgColor = useColorModeValue("gray.100", "gray.800");
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

  const SortMenu = () => (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        rightIcon={<HiChevronDown />}
        transitionDelay="100"
      >
        Sorted by:
        <Text as="span" color="teal.400" ml="3">
          {sortNames[sortType]}{" "}
        </Text>
      </MenuButton>
      <MenuList>
        {Object.keys(sortNames).map((sort: string) => (
          <MenuItem
            key={sort}
            onClick={() => setSort(sort as SortType)}
            isActive={sort === sortType}
          >
            {sortNames[sort as SortType]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  if (!postDetails) return null;

  return (
    <div>
      {subreddit ? (
        <NextLink href={`/r/${subreddit}`} passHref>
          <Link>{subreddit}</Link>
        </NextLink>
      ) : (
        <Link>no subreddit</Link>
      )}

      <Heading as="h4" size="md" mb="5">
        <NextLink href={url} passHref>
          <Link target="_blank">{title}</Link>
        </NextLink>
      </Heading>

      {/* show image for suitable file extensions */}
      {url?.match(/^.*\.(jpg|JPG|png|PNG)$/) && (
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
            alt={url}
            cursor="pointer"
            draggable="false"
            minW="10vw"
            w="30vw"
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
          />
        </Box>
      )}

      {selftext && (
        <Box
          className="comment"
          bgColor={bgColor}
          border="1px"
          borderColor="whiteAlpha.400"
          borderRadius="5px"
          px={5}
          py={2}
          rounded="md"
          maxW="container.xl"
        >
          <ReactMarkdown
          // transformLinkUri={(href) => (
          //   <a style={{ color: "yellow" }}>baba link {href}</a>
          // )}
          >
            {selftext}
          </ReactMarkdown>
        </Box>
      )}

      <HStack mt="10px" mb="10px" spacing={5}>
        <div>{num_comments} comments</div>
        <Link
          onClick={toggleAllChildComments}
          color="gray.500"
          userSelect="none"
        >
          {showChildComments
            ? "hide all child comments"
            : "show all child comments"}
        </Link>
      </HStack>
      <SortMenu />
    </div>
  );
}

export default PostHeader;
