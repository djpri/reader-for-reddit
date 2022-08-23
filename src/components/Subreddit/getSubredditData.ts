import { RedditAPI } from "../../redditApi";

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
  sort: string = "hot",
  after: string | null = null,
  t: string = "day",
  count: number = 25
): Promise<SubredditPostData> => {
  try {
    const params =
      sort === "top" || sort === "controversial"
        ? { after, count, t }
        : { after, count };
    const { data } = await RedditAPI.get(`r/${subreddit}/${sort}`, {
      params,
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
