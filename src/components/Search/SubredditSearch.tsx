import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  StackDivider,
  useColorModeValue,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import useSubredditSearch from "./useSubredditSearch";
import NextLink from "next/link";

function SubredditSearch() {
  const { handleSearch, setSearch, search, isLoading, searchResults } =
    useSubredditSearch();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const searchColor = useColorModeValue("black", "white");

  // close search results if user clicks outside of input
  useOutsideClick({
    ref: inputRef,
    handler: () => {
      console.log("clicked outside");
      isOpen && setIsOpen(false);
    },
  });

  // close search results if user presses tab
  useEffect(() => {
    const handleKeyDown = (e) => {
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
      w="60%"
      maxW="550px"
      spacing={2}
      position="relative"
      ref={inputRef}
      onClick={() => setIsOpen(true)}
      onFocus={() => setIsOpen(true)}
    >
      <InputGroup spacing={2} right={["0px", "0px", "30px"]}>
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
          spacing={3}
          rounded="sm"
          bgColor="gray.100"
          position="absolute"
          color="black"
          right="30px"
          align="flex-start"
          top="40px"
          w="100%"
          divider={<StackDivider borderColor="gray.300" />}
        >
          {isOpen &&
            searchResults.map((result) => (
              <NextLink key={result.data.id} href={result.data.url} passHref>
                <Link>{result.data.url}</Link>
              </NextLink>
            ))}
        </VStack>
      )}
    </VStack>
  );
}

export default SubredditSearch;
