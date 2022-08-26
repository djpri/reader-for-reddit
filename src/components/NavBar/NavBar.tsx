import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaMoon, FaSun } from "react-icons/fa";
import { SiReddit } from "react-icons/si";
import SubredditSearch from "../Search/SubredditSearch";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("white", "hsl(222, 47%, 8%)");
  const buttonBgColor = useColorModeValue("gray.50", "gray.700");
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");

  return (
    <Box
      as="header"
      h="56px"
      boxShadow="rgb(0 0 0 / 8%) 0 1px 0"
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
      <Container maxW="container.xl">
        <Grid as="nav" templateColumns="1fr 2fr 1fr" w="100%" pt={2} pb={2}>
          <Flex align="center" justifySelf="start">
            {/* <LeftDrawer /> */}
            <NextLink href="/" passHref>
              <Link>
                <SiReddit size="1.3rem" />
              </Link>
            </NextLink>
            {isDesktop && (
              <NextLink href="/" passHref>
                <Link _hover={{ textDecoration: "none" }}>
                  <Text fontSize="lg" ml="3" fontWeight="bold">
                    /r/eader for reddit
                  </Text>
                </Link>
              </NextLink>
            )}
          </Flex>
          <SubredditSearch />
          <HStack justifySelf="end">
            <Button
              onClick={toggleColorMode}
              color={color}
              bgColor={buttonBgColor}
              size="sm"
              rounded="sm"
              boxShadow="rgb(0 0 0 / 8%) 0 1px 0"
            >
              {colorMode === "dark" ? (
                <FaSun size="1rem" color="white" />
              ) : (
                <FaMoon size="1rem" />
              )}
            </Button>
          </HStack>
        </Grid>
      </Container>
    </Box>
  );
}

export default NavBar;
