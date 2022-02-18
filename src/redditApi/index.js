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
      REDDIT.defaults.headers.common["Authorization"] = authToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
