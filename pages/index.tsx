import { Button, Container, Grid, Heading, Link, Wrap } from "@chakra-ui/react";
import NextLink from "next/link";
import { NextRouter, useRouter } from "next/router";

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

const mySubs = [
  "learnprogramming",
  "soccer",
  "formula1",
  "liverpoolfc",
  "webdev",
];

export default function Home() {
  const SubLink = ({ sub }: { sub: string }) => {
    return (
      <NextLink href={`r/${sub}`} passHref>
        <Link _hover={{ textDecoration: "none" }}>
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
      <Heading as="h1" fontSize="3xl" mb={5}>
        Popular Subreddits
      </Heading>
      <Grid templateColumns="repeat(auto-fit, 15rem)" gap={4} my={5}>
        {popularSubs.map((sub) => (
          <SubLink key={sub} sub={sub} />
        ))}
      </Grid>
      <Heading as="h1" fontSize="3xl" mb={5}>
        My Subreddits
      </Heading>
      <Grid templateColumns="repeat(auto-fit, 15rem)" gap={4} my={5}>
        {mySubs.map((sub) => (
          <SubLink key={sub} sub={sub} />
        ))}
      </Grid>
    </Container>
  );
}
