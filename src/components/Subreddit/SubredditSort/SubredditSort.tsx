import {
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import SearchError from "../../Errors/SearchError";
import { HiChevronDown } from "react-icons/hi";

function SubredditSort({ subSort }) {
  const {
    sortPostsBy,
    handleSearch,
    setSearch,
    search,
    isError,
    isLoading,
    sortedPosts,
  } = subSort;

  if (!sortedPosts) return null;

  return (
    <>
      <Input
        placeholder="Type in a subreddit"
        mb="10px"
        mt="30px"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {isError && <SearchError />}
      <Button
        isLoading={isLoading}
        colorScheme="blue"
        color="white"
        size="sm"
        onClick={handleSearch}
      >
        Get Posts
      </Button>

      <Menu>
        <MenuButton as={Button} ml="3" size="sm" rightIcon={<HiChevronDown />}>
          Sorted by
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => sortPostsBy("score", "Top")}>Top</MenuItem>
          <MenuItem onClick={() => sortPostsBy("created", "Newest")}>
            New
          </MenuItem>
          <MenuItem onClick={() => sortPostsBy("created", "Oldest", false)}>
            Old
          </MenuItem>
          <MenuItem
            onClick={() => sortPostsBy("num_comments", "Most Commented")}
          >
            Comments
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default SubredditSort;
