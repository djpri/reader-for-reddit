import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";

function SubredditSort({ subSort }) {
  const { sortPostsBy, sortedPosts, sortType } = subSort;

  if (!sortedPosts) return null;

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        rightIcon={<HiChevronDown />}
        transitionDelay="100"
      >
        Quick sort
        <Text as="span" color="purple.500" ml="3">
          {sortType}
        </Text>
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
