import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AiFillSetting } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { SiReddit } from "react-icons/si";
import SubredditSearch from "../Search/SubredditSearch";

// TODO: Add settings page link when page is created

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("white", "hsl(220 38% 8% / 1)");
  // const buttonBgColor = useColorModeValue("gray.50", "gray.700");
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");

  return (
    <Box
      as="header"
      h="56px"
      boxShadow="rgb(10 0 10 / 6%) 0px 1px 1px, rgb(0 0 0 / 18%) 0px 1px 1px"
      w="100%"
      bgColor={bgColor}
      color={color}
      position="fixed"
      zIndex="100"
      top="0"
      borderColor="whiteAlpha.300"
      mb="50px"
      opacity={1}
    >
      <Container maxW="90vw">
        <Grid as="nav" templateColumns="1fr 2fr 1fr" w="100%" pt={2} pb={2}>
          <Flex align="center" justifySelf="start">
            {/* <LeftDrawer /> */}
            <NextLink href="/" passHref legacyBehavior>
              <Link>
                <SiReddit size="1.3rem" />
              </Link>
            </NextLink>
            {isDesktop && (
              <NextLink href="/" passHref legacyBehavior>
                <Link _hover={{ textDecoration: "none" }}>
                  <Text fontSize="md" ml="3" fontWeight="bold" letterSpacing="0.07em">
                    /r/eader for reddit
                  </Text>
                </Link>
              </NextLink>
            )}
          </Flex>
          <SubredditSearch />
          <HStack justifySelf="end">
            <Link as={NextLink} href="/settings">
              <IconButton
                aria-label="Settings"
                boxShadow="rgb(10 0 30 / 30%) 0px 1px 2px, rgb(0 0 0 / 18%) 0px 1px 1px"
                icon={<AiFillSetting size="1.1rem" />}
                size="sm"
                rounded="sm"
              />
            </Link>
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              color={color}
              size="sm"
              rounded="sm"
              // boxShadow="rgb(0 0 0 / 8%) 0 1px 0"
              boxShadow="rgb(10 0 30 / 30%) 0px 1px 2px, rgb(0 0 0 / 18%) 0px 1px 1px"
              icon={
                colorMode === "dark" ? (
                  <FaSun size="1rem" color="white" />
                ) : (
                  <FaMoon size="1rem" />
                )
              }
            />
          </HStack>
        </Grid>
      </Container>
    </Box>
  );
}

export default NavBar;
