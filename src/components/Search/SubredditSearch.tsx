import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useColorModeValue,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import useSubredditSearch from "./useSubredditSearch";

function SubredditSearch() {
  const { handleSearch, setSearch, search, isLoading, searchResults } =
    useSubredditSearch();
  const router: NextRouter = useRouter();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const searchColor = useColorModeValue("black", "white");

  // close search results if user clicks outside of input
  useOutsideClick({
    ref: inputRef,
    handler: () => {
      isOpen && setIsOpen(false);
    },
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setSearch("");
      setIsOpen(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, setSearch]);

  // close search results if user presses tab
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <VStack
      justifySelf="center"
      w="100%"
      maxW="550px"
      spacing={2}
      position="relative"
      ref={inputRef}
      onClick={() => setIsOpen(true)}
      onFocus={() => setIsOpen(true)}
    >
      <InputGroup gap={2}>
        <Input
          rounded="sm"
          bgColor={bgColor}
          placeholder="Search subreddits"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <InputRightElement w="4rem">
          <IconButton
            m="0"
            isLoading={isLoading}
            aria-label="Search database"
            icon={<BiSearch color={searchColor} size="1.4rem" />}
            onClick={handleSearch}
            w="100%"
            disabled={!search}
          />
        </InputRightElement>
      </InputGroup>
      {searchResults?.length > 0 && (
        <VStack
          rounded="sm"
          bgColor="white"
          position="absolute"
          color="black"
          align="flex-start"
          top="40px"
          w="100%"
        >
          {isOpen &&
            searchResults.map((result) => (
              <Box
                key={result.data.id}
                _hover={{ bgColor: "#eeeeee" }}
                w="100%"
                h="100%"
                px={4}
                py={1}
              >
                <NextLink href={result.data.url} passHref legacyBehavior>
                  <Link fontWeight="bold">{result.data.url}</Link>
                </NextLink>
              </Box>
            ))}
        </VStack>
      )}
    </VStack>
  );
}

export default SubredditSearch;
