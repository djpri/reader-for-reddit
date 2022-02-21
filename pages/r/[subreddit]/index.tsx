import { NextRouter, useRouter } from "next/router";
import Posts from "../../../src/components/Subreddit/Posts";

function Subreddit() {
  const router: NextRouter = useRouter();
  const { subreddit } = router.query;

  return <Posts subreddit={subreddit} />;
}

export default Subreddit;
