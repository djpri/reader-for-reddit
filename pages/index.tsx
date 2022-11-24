import {
  Button,
  Container,
  Grid,
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
      <NextLink href={`/r/${sub}`} passHref legacyBehavior>
        <Link _hover={{ textDecoration: "none" }} as={NextLink}>
          <Button width="15rem">{sub}</Button>
        </Link>
      </NextLink>
    );
  };

  return (
    <Container maxW="container.xl">
      <Wrap spacing={5} my={5}>
        <SubLink sub="Home" />
        <SubLink sub="Popular" />
        <SubLink sub="All" />
      </Wrap>
      <Heading as="h1" fontSize="2xl" mb={5}>
        Popular Subreddits
      </Heading>
      <Grid templateColumns="repeat(auto-fit, 15rem)" gap={4} my={5}>
        {popularSubs.map((sub) => (
          <SubLink key={sub} sub={sub} />
        ))}
      </Grid>
      <Heading as="h1" fontSize="2xl" mb={5}>
        My Subreddits
      </Heading>
      <Grid templateColumns="repeat(auto-fit, 15rem)" gap={4} my={5}>
        {savedSubreddits.length > 0 ? (
          savedSubreddits.map((sub: string) => <SubLink key={sub} sub={sub} />)
        ) : (
          <Text>
            No Subreddits found. Use the{" "}
            <IconButton
              icon={<AiFillStar />}
              aria-label={"star button"}
              size="xs"
            />{" "}
            button to save sub to list when visiting a subreddit.
          </Text>
        )}
      </Grid>
    </Container>
  );
}
