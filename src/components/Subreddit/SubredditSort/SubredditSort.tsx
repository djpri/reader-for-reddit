import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";

function SubredditSort({ subSort }) {
  const { sortPostsBy, sortedPosts } = subSort;

  if (!sortedPosts) return null;

  return (
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
        <MenuItem onClick={() => sortPostsBy("num_comments", "Most Commented")}>
          Comments
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default SubredditSort;
