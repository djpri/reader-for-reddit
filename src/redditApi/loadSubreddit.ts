import { REDDIT } from "./index";

export const loadSubreddit = async (subreddit) => {
  try {
    const { data } = await REDDIT.get(`r/${subreddit}`);

    return {
      after: data.after,
      before: data.before,
      children: data.children,
    };
  } catch (err) {
    return;
  }
};
