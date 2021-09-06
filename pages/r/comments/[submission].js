import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

function Submission({ apiData }) {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState(apiData || null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log(apiData);
  }, []);

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

  return <Container maxW="container.xl"></Container>;
}

export default Submission;

export async function getServerSideProps({ params }) {
  const submission = params.submission;
  // Fetch data from reddit API
  const response = await fetch(`http://localhost:3000/api/r/comments/baba`);
  let comments;
  if (response.ok) {
    comments = await response.json();
  }
  // Pass data to the page via props
  return {
    props: {
      apiData: comments.comments || null,
    },
  };
}
