import { RedditAPI } from "./axiosInstance";

interface SubredditPostData {
  after: string | null;
  before: string | null;
  children: any[];
}

export const loadSubredditInfo = async (subreddit: string) => {
  try {
    const { data } = await RedditAPI.get(`r/${subreddit}/about`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const loadSubredditPosts = async (
  subreddit: string | string[]
): Promise<SubredditPostData> => {
  try {
    const { data } = await RedditAPI.get(`r/${subreddit}`);

    return {
      after: data.after,
      before: data.before,
      children: data.children,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const loadMoreSubredditPosts = async (
  subreddit: string | string[],
  after: string,
  count: number = 25
): Promise<SubredditPostData> => {
  try {
    const { data } = await RedditAPI.get(`r/${subreddit}`, {
      params: { after, count },
    });

    return {
      after: data.after,
      before: data.before,
      children: data.children,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
