import { RedditAPI } from "./axiosInstance";

export const loadCommentsFromPost = async (permalink: string) => {
  try {
    const data = await RedditAPI.get(permalink);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loadMoreCommentsFromPost = async (
  permalink: string,
  after: string
) => {
  try {
    const data = await RedditAPI.get(permalink, {
      params: { after },
    });

    return data;
  } catch (err) {
    return null;
  }
};
