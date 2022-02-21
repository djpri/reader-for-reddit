import axios, { AxiosError, AxiosResponse } from "axios";

const getTokenAsync = async () => {
  const { data } = await axios.get("/api/token");
  localStorage.setItem("accessToken", data);
};

export const RedditAPI = axios.create({
  baseURL: "https://oauth.reddit.com/",
  timeout: 5000,
  params: {
    raw_json: 1,
  },
});

RedditAPI.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("accessToken");
    if (!token) await getTokenAsync();
    config.headers.Authorization = `bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (error) {
    console.log(error);
  }
);

RedditAPI.interceptors.response.use(
  function (response: AxiosResponse) {
    console.log(response.data);
    return response.data;
  },
  async function (error: AxiosError) {
    const noToken = error.response.status === 403;
    const tokenHasFailed = error.response.status === 401;

    if (tokenHasFailed || noToken) await getTokenAsync();

    return Promise.reject(error);
  }
);
