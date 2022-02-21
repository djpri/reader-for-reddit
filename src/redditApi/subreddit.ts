import { RedditAPI } from "./axiosInstance";

interface SubredditPostData {
  after: string | null;
  before: string | null;
  children: any[];
}

export const loadSubredditInfo = async (subreddit: string) => {
  try {
    const data = await RedditAPI.get(`r/${subreddit}/about`);
    return data;
  } catch (error) {
    throw new Error("Could not get subreddit info");
  }
};

export const loadSubredditPosts = async (
  subreddit: string | string[],
  after: string | null = null,
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
    throw new Error("Could not get subreddit posts");
  }
};
