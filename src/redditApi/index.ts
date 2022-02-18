import axios from "axios";

// let authToken = localStorage.getItem("accessToken") || null;
let authToken = "-PGKW2f35j2EkCmUbonMafkjfdT2YiA";

const REDDIT = axios.create({
  baseURL: "https://oauth.reddit.com/",
  timeout: 5000,
  headers: {
    Authorization: `bearer ${authToken}`,
  },
});

REDDIT.interceptors.request.use(
  function (config) {
    if (!authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  function (error) {
    console.log(error);
  }
);

// ADD RESPONSE INTERCEPTOR

export const loadSubreddit = async (subreddit) => {
  try {
    const {
      data: { data },
    } = await REDDIT.get(`r/${subreddit}/hot`);

    return {
      after: data.after,
      before: data.before,
      children: data.children,
    };
  } catch (err) {
    return;
  }
};
