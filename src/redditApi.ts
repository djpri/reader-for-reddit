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

let requestsMade = 0;

RedditAPI.interceptors.request.use(
  async function (config) {
    requestsMade++;
    const token = localStorage.getItem("accessToken");
    if (!token) await getTokenAsync();
    config.headers.Authorization = `bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (error) {
    requestsMade++;
    console.log(error);
  }
);

// if successful don't inlcude headers or config, just return the data
RedditAPI.interceptors.response.use(
  function (response: AxiosResponse) {
    console.log(`SUCCESS! REQUESTS MADE: ${requestsMade}`);
    console.log(response);
    return response.data;
  },
  async function (error: AxiosError) {
    console.log(`FAILED. REQUESTS MADE: ${requestsMade}`);
    const noToken = error.response.status === 403;
    const tokenHasFailed = error.response.status === 401;

    if (tokenHasFailed || noToken) await getTokenAsync();

    return Promise.reject(error);
  }
);
