import styles from "../styles/Home.module.css";
import SubredditSearch from "../src/components/Subreddit/SubredditSearch";

export default function Home({ subreddit }) {
  return (
    <div className={styles.container}>
      <h1>Posts from {`/r/${subreddit}`}</h1>
      <SubredditSearch />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      subreddit: "webdev",
    },
  };
}
