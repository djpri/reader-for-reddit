import axios from "axios";

export type SubredditPost = {
  kind: string;
  data: any;
};

export const REDDIT = axios.create({
  baseURL: "https://oauth.reddit.com/",
  timeout: 5000,
  headers: {
    Authorization: "bearer -q9KK44gUrwTfuWRS1dzOtsMaPRupww",
  },
  params: {
    raw_json: 1,
  },
});

REDDIT.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    console.log(config);
    return config;
  },
  function (error) {
    console.log(error);
  }
);

REDDIT.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
