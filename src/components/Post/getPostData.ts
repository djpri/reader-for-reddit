import { RedditAPI } from "../../redditApi";

export const loadPostDetailsAndComments = async (permalink: string) => {
  try {
    const response = await RedditAPI.get(permalink, {
      params: {
        depth: 4,
        limit: 200,
      },
    });
    const postDetails = response[0].data.children[0].data;
    const parentComments = response[1].data.children;

    return { postDetails, parentComments };
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
