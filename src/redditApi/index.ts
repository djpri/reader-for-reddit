import axios from "axios";

// let authToken = localStorage.getItem("accessToken") || null;
let authToken = "-Az8Ma2ckQmDayEbtyxUGJMg77w5C-w";

export type SubredditPost = {
  kind: string;
  data: any;
};

// More details: https://www.reddit.com/dev/api/#listings
export type ListingParams = {
  // only one should be specified. these indicate the fullname of an item in the listing to use as the anchor point of the slice
  before: string;
  after: string;
  // the number of items already seen in this listing
  count: number;
  // the maximum number of items desired (default: 25, maximum: 100)
  limit: number;
  // optional parameter; if "all" is passed, filters such as "hide links that I have voted on" will be disabled
  show: string;
};

const REDDIT = axios.create({
  baseURL: "https://oauth.reddit.com/",
  timeout: 5000,
  headers: {
    Authorization: `bearer ${authToken}`,
  },
  params: {
    raw_json: 1,
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
