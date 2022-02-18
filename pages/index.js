import styles from "../styles/Home.module.css";

export default function Home({ subreddit }) {
  return (
    <div className={styles.container}>
      <h1>Posts from {`/r/${subreddit}`}</h1>
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
