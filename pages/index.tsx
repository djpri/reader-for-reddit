import {
  Button,
  Container,
  Heading,
  IconButton,
  Link,
  Text,
  Wrap,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const popularSubs = [
  "announcements",
  "funny",
  "AskReddit",
  "gaming",
  "aww",
  "Music",
  "worldnews",
  "pics",
  "movies",
  "todayilearned",
  "science",
  "videos",
  "Showerthoughts",
  "news",
  "jokes",
];

export default function Home() {
  const [savedSubreddits, setSavedSubreddits] = useState([]);

  useEffect(() => {
    const getSubsFromLocalStorage = () => {
      if (localStorage?.getItem("savedSubreddits") !== null) {
        return JSON.parse(localStorage.getItem("savedSubreddits"));
      } else {
        return [];
      }
    };
    setSavedSubreddits(getSubsFromLocalStorage);
  }, []);

  const SubLink = ({ sub }: { sub: string }) => {
    return (
      <NextLink href={`/r/${sub}`} passHref legacyBehavior className="home-subreddit-link">
        <Link _hover={{ textDecoration: "none" }} as={NextLink}>
          <Button
            boxShadow="rgb(0 0 0 / 6%) 0px 1px 4px, rgb(0 0 0 / 18%) 0px 3px 3px"
            rounded="sm"
            // my={2}
          >
            {sub}
          </Button>
        </Link>
      </NextLink>
    );
  };

  return (
    <Container maxW="90vw">
      <Wrap spacing={5} my={3} pb={5}>
        <SubLink sub="Home" />
        <SubLink sub="Popular" />
        <SubLink sub="All" />
      </Wrap>
      <Heading as="h1" fontSize="2xl" mb={5}>
        Popular Subreddits
      </Heading>
      <Wrap spacing={5} my={2} py={2}>
        {popularSubs.map((sub) => (
          <SubLink key={sub} sub={sub} />
        ))}
      </Wrap>
      <Heading as="h1" fontSize="2xl" mb={5}>
        My Subreddits
      </Heading>

      {savedSubreddits.length > 0 ? (
        <Wrap spacing={5} my={5} pb={5}>
          {savedSubreddits.map((sub: string) => (
            <SubLink key={sub} sub={sub} />
          ))}
        </Wrap>
      ) : (
        <Text>
          No Subreddits found. Use the{" "}
          <IconButton
            icon={<AiFillStar />}
            aria-label={"star button"}
            size="xs"
          />{" "}
          button to save a subreddit to this list when visiting a subreddit.
        </Text>
      )}
    </Container>
  );
}
