import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFileDownload, FaMoon, FaSun } from "react-icons/fa";
import { SiReddit } from "react-icons/si";
import { useIsFetching } from "react-query";
import LeftDrawer from "../LeftDrawer/LeftDrawer";

function NavBar() {
  const isFetching = useIsFetching();
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      as="header"
      w="100%"
      bgColor={bgColor}
      color={color}
      position="fixed"
      zIndex="100"
      top="0"
      border="1px solid"
      borderColor="whiteAlpha.300"
      mb="50px"
      opacity={1}
    >
      <Container maxW="container.xl">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          w="100%"
          pt={2}
          pb={2}
        >
          <Flex align="center">
            <LeftDrawer />
            <SiReddit size="1.3rem" />
            <Text fontSize="lg" ml="3" fontWeight="bold">
              /r/eader for reddit
            </Text>
          </Flex>
          <HStack>
            {isFetching && <FaFileDownload size="1rem" color="green" />}
            <Button
              onClick={toggleColorMode}
              colorScheme="whiteAlpha"
              color={color}
              size="sm"
            >
              {colorMode === "dark" ? (
                <FaSun size="1rem" color="white" />
              ) : (
                <FaMoon size="1rem" />
              )}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavBar;
