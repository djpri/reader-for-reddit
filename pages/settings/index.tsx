import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Switch,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import BaseContainer from "src/components/base/BaseContainer";
import {
  removeCommentKeywordsFilter,
  removePostKeywordsFilter,
  selectSettings,
  setNewCommentKeywordsFilter,
  setNewPostKeywordsFilter,
  toggleNSFW,
} from "src/redux/slices/appSlice";
import { useAppDispatch, useAppSelector } from "src/redux/store";

function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "white");

  const dispatch = useAppDispatch();
  const { postKeywordsFilter, showNSFW } = useAppSelector(selectSettings);

  const KeyWordInput = ({
    defaultValue,
    index,
    type,
  }: {
    defaultValue: string;
    index: number;
    type: "comment" | "post";
  }) => {
    const handleRemove = () => {
      if (type === "comment") {
        dispatch(removeCommentKeywordsFilter(index));
      }
      if (type === "post") {
        dispatch(removePostKeywordsFilter(index));
      }
    };

    return (
      <HStack width={"100%"}>
        <Text width={["100%", null, null, "60ch"]}>{defaultValue}</Text>
        <Button onClick={handleRemove} rightIcon={<AiFillDelete />}>
          Remove
        </Button>
      </HStack>
    );
  };

  const AddNewKeywordInput = ({ type }: { type: "comment" | "post" }) => {
    const [value, setValue] = useState("");

    const handleAdd = () => {
      if (type === "comment") {
        dispatch(setNewCommentKeywordsFilter(value));
      }
      if (type === "post") {
        dispatch(setNewPostKeywordsFilter(value));
      }
    };

    return (
      <HStack width={"100%"}>
        <Input
          width={["100%", null, null, "60ch"]}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Button aria-label="Add Filter" onClick={handleAdd}>
          Add
        </Button>
      </HStack>
    );
  };

  return (
    <BaseContainer>
      <Heading as="h1" fontSize="2xl" my={8}>
        Settings
      </Heading>
      <Box>
        <Heading as="h2" fontSize="xl">
          Theme
        </Heading>
        <HStack spacing={2} my={2}>
          <Text>
            Current theme:{" "}
            <Text as="span" textTransform="capitalize">
              {colorMode}
            </Text>
          </Text>
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
        <Heading as="h2" fontSize="xl">
          NSFW
        </Heading>
        <FormControl display="flex" alignItems="center" my={2}>
          <FormLabel htmlFor="toggle-nsfw" mb="0">
            Show NSFW content
          </FormLabel>
          <Switch
            colorScheme={showNSFW ? "red" : "blue"}
            id="toggle-nsfw"
            isChecked={showNSFW}
            onChange={() => {
              dispatch(toggleNSFW());
            }}
          />
        </FormControl>
        <hr />
        {/* <VStack alignItems="flex-start" my={4}>
          <Heading as="h2" fontSize="xl">
            Comment keyword filters
          </Heading>
          <Text>Comments containing any of these keywords will be hidden</Text>
          {commentKeywordsFilter.map((keyword, index) => (
            <KeyWordInput
              defaultValue={keyword}
              key={index}
              index={index}
              type="comment"
            />
          ))}
          <AddNewKeywordInput type="comment" />
        </VStack>
        <hr/> */}
        <VStack alignItems="flex-start" my={4}>
          <Heading as="h2" fontSize="xl">
            Subreddit keyword filters
          </Heading>
          <Text>
            Posts from subreddits containing any of these keywords in the title
            will be hidden
          </Text>
          {postKeywordsFilter.map((keyword, index) => (
            <KeyWordInput
              defaultValue={keyword}
              key={index}
              index={index}
              type="post"
            />
          ))}
          <AddNewKeywordInput type="post" />
        </VStack>
      </Box>
    </BaseContainer>
  );
}

export default Settings;
