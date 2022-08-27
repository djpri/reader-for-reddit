import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";

interface IProps {
  sub: string;
  onClose: () => void;
}

function SubredditLink({ sub, onClose }: IProps) {
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
