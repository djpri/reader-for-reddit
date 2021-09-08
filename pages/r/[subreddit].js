import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Post from "../../src/components/Post/_Post";
import { HiChevronDown } from "react-icons/hi";
import {
  Container,
  Text,
  Heading,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import SearchError from "../../src/components/Errors/SearchError";

function Subreddit({ subreddit, apiData }) {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState(apiData || null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setisLoading(false);
      setSortType(null);
      setIsError(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    setPosts(apiData);
  }, [apiData]);

  const sortPostsBy = (type, sortType, ascending = true) => {
    setSortType(sortType);
    setPosts((data) => {
      const sortedData = data.sort((a, b) => {
        if (ascending) {
          return b[type] - a[type];
        } else {
          return a[type] - b[type];
        }
      });
      // spread operator required because sort does not make a copy of original array
      return [...sortedData];
    });
  };

  const handleSearch = () => {
    if (!search) {
      setIsError(true);
      return;
    }
    setisLoading(true);
    setIsError(false);
    router.push(`/r/${search}`);
  };

  return (
    <Container maxW="container.xl">
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
        size="md"
        onClick={handleSearch}
      >
        Get Posts
      </Button>

      <Menu>
        <MenuButton as={Button} ml="3" rightIcon={<HiChevronDown />}>
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

      <Heading as="h1" mb="30px" mt="10px">
        {sortType} Posts from {`/r/${subreddit}`}
      </Heading>

      {posts &&
        posts.map((post, index) => <Post key={index} postData={post} />)}

      {!posts && (
        <Text>
          No posts found. This subreddit does not exist or no longer exists.
        </Text>
      )}
    </Container>
  );
}

export default Subreddit;

export async function getServerSideProps({ params }) {
  const sub = params.subreddit;
  // Fetch data from reddit API
  const response = await fetch(`http://localhost:3000/api/r/${sub}`);
  let data = { data: "" };
  if (response.ok) {
    data = await response.json();
  }
  // Pass data to the page via props
  return {
    props: {
      apiData: data?.data || null,
      subreddit: sub,
    },
  };
}
