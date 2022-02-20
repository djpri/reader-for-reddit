import { RedditAPI } from "./axiosInstance";

interface CommentsData {
  after: string | null;
  before: string | null;
  children: any[];
}

export const loadCommentsFromPost = async (
  subreddit: string | string[]
): Promise<CommentsData> => {
  try {
    const { data } = await RedditAPI.get(`r/${subreddit}`);

    return {
      after: data.after,
      before: data.before,
      children: data.children,
    };
  } catch (err) {
    return null;
  }
};

export const loadMoreCommentsFromPost = async (
  subreddit: string | string[],
  after: string
): Promise<CommentsData> => {
  try {
    const { data } = await RedditAPI.get(`r/${subreddit}`, {
      params: { after },
    });

    return {
      after: data.after,
      before: data.before,
      children: data.children,
    };
  } catch (err) {
    return null;
  }
};
