import {
  Flex,
  Container,
  Box,
  HStack,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { SiReddit } from "react-icons/si";
import { FaSun, FaMoon } from "react-icons/fa";
import LeftDrawer from "../LeftDrawer/LeftDrawer";
import LogInDrawer from "../LogInDrawer/LogInDrawer";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box as="header" w="100%" bgColor="blue.600" color="#f7f7f7">
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
            <Text fontSize="2xl" ml="3" fontWeight="bold">
              Reddit Lite
            </Text>
          </Flex>
          <HStack>
            <Button
              onClick={toggleColorMode}
              colorScheme="whiteAlpha"
              color="black"
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
