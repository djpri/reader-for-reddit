import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ subreddit }) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});

  const [token, setToken] = useState("");

  return (
    <div className={styles.container}>
      <h1>Posts from {`/r/${subreddit}`}</h1>
      <p>The token is {token}</p>
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
