import { RedditAPI } from "../../redditApi";

export const loadPostDetailsAndComments = async (
  permalink: string,
  sort = "confidence"
) => {
  try {
    const response = await RedditAPI.get(permalink, {
      params: {
        depth: 4,
        limit: 300,
        sort,
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

export const getMoreChildrenComments = async (
  link_id: string,
  comments: []
) => {
  try {
    const data = await RedditAPI.get("api/morechildren", {
      params: {
        link_id,
        comments: comments.join(","),
      },
    });

    return data;
  } catch (err) {
    return null;
  }
};
