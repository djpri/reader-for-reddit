import axios from "axios";

let authToken = localStorage.getItem("accessToken") || null;
let lastVisited = localStorage.getItem("lastVisited") || null;

const REDDIT = axios.create({
  baseURL: "https://oauth.reddit.com/",
  timeout: 5000,
  headers: {
    Authorization: authToken,
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

const loadFrontPage = async () => {
  try {
    //console.log("WITH LOGIN", token);
    const res1 = await axios.get(`https://oauth.reddit.com/${sort}`, {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
      params: {
        raw_json: 1,
        t: range,
        after: after,
        count: count,
      },
    });
    let res = await res1.data;
    ratelimit_remaining = res1.headers["x-ratelimit-remaining"];

    return {
      after: res.data.after,
      before: res.data.before,
      children: res.data.children,
      token: returnToken,
    };
  } catch (err) {
    //console.log(err);
  }
};
