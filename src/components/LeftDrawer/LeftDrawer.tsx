import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SubredditLink from "./SubredditLink";

function LeftDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("black", "white");
  const btnRef = useRef();

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="whiteAlpha"
        onClick={onOpen}
        mr="3"
        size="sm"
        color={color}
      >
        <GiHamburgerMenu size="1.3rem" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Log in to see your subreddits</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Search for subreddits..." mb="5" />
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={2}
              align="stretch"
            >
              <SubredditLink sub="boxing" onClose={onClose} />
              <SubredditLink sub="liverpoolfc" onClose={onClose} />
              <SubredditLink sub="soccer" onClose={onClose} />
              <SubredditLink sub="learnprogramming" onClose={onClose} />
              <SubredditLink sub="webdev" onClose={onClose} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LeftDrawer;
