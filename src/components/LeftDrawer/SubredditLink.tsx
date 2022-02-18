import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";

function SubredditLink({ sub, onClose }) {
  const router = useRouter();
  const route = `/r/${sub}`;
  return (
    <Link
      onClick={() => {
        router.push(route);
        onClose();
      }}
    >
      {sub}
    </Link>
  );
}

export default SubredditLink;
