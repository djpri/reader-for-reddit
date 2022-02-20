import axios, { AxiosError, AxiosResponse } from "axios";

export type SubredditPost = {
  kind: string;
  data: any;
};

export const RedditAPI = axios.create({
  baseURL: "https://oauth.reddit.com/",
  timeout: 5000,
  headers: {
    Authorization: "bearer -q9KK44gUrwTfuWRS1dzOtsMaPRupww",
  },
  params: {
    raw_json: 1,
  },
});

RedditAPI.interceptors.request.use(
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

RedditAPI.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  async function (error: AxiosError) {
    const noToken = error.response.status === 403;
    const tokenHasFailed = error.response.status === 401;

    const getTokenAsync = async () => {
      const { data } = await axios.get("/api/token");
      localStorage.setItem("accessToken", data);
    };

    if (tokenHasFailed || noToken) await getTokenAsync();

    return Promise.reject(error);
  }
);
