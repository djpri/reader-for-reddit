import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home({ subreddit }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});

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
