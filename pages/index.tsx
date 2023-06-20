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
import { AiFillStar } from "react-icons/ai";
import { selectSavedSubreddits } from "src/redux/slices/appSlice";
import { useAppSelector } from "src/redux/store";

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
  const savedSubreddits = useAppSelector(selectSavedSubreddits);
  
  const SubLink = ({ sub }: { sub: string }) => {
    return (
      <NextLink href={`/r/${sub}`} passHref legacyBehavior className="home-subreddit-link">
        <Link _hover={{ textDecoration: "none" }} as={NextLink}>
          <Button
            boxShadow="rgb(10 0 30 / 30%) 0px 1px 2px, rgb(0 0 0 / 18%) 0px 2px 2px"
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
      <Heading as="h1" fontSize="xl" mb={5}>
        Popular Subreddits
      </Heading>
      <Wrap spacing={5} my={2} py={2}>
        {popularSubs.map((sub) => (
          <SubLink key={sub} sub={sub} />
        ))}
      </Wrap>
      <Heading as="h1" fontSize="xl" mb={5}>
        My Subreddits
      </Heading>

      {savedSubreddits?.length > 0 ? (
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
