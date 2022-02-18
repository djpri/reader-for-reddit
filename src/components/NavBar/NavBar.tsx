import {
  Flex,
  Container,
  Box,
  HStack,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SiReddit } from "react-icons/si";
import { FaSun, FaMoon } from "react-icons/fa";
import LeftDrawer from "../LeftDrawer/LeftDrawer";
import LogInDrawer from "../LogInDrawer/LogInDrawer";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("blue.50", "gray.900");

  return (
    <Box
      as="header"
      w="100%"
      bgColor={bgColor}
      color={color}
      position="sticky"
      zIndex="100"
      top="0"
      border="1px solid"
      borderColor="whiteAlpha.300"
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
            <SiReddit size="1.5rem" />
            <Text fontSize="xl" ml="3" fontWeight="bold">
              /r/eader for reddit
            </Text>
          </Flex>
          <HStack>
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
            <LogInDrawer />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavBar;
