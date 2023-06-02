import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
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
  const dispatch = useAppDispatch();
  const { postKeywordsFilter, showNSFW } =
    useAppSelector(selectSettings);

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
    <Container maxW="90vw">
      <Heading as="h1" fontSize="2xl" my={8}>
        Settings
      </Heading>
      <Box>
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
        <hr/>
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
    </Container>
  );
}

export default Settings;
