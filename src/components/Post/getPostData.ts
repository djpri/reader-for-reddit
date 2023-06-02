import { RedditAPI } from "../../redditApi";

export const loadPostDetailsAndComments = async (
  permalink: string,
  sort = "confidence",
  commentId?: string
) => {
  try {
    const response: any = await RedditAPI.get(permalink, {
      params: {
        depth: 4,
        limit: 300,
        sort,
        comment: commentId,
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
  const childrenList =
    comments.length > 100
      ? comments.join(",")
      : comments.slice(0, 100).join(",");
  try {
    const data = await RedditAPI.get("api/morechildren", {
      params: {
        link_id: link_id,
        children: childrenList,
      },
    });

    return data;
  } catch (err) {
    return null;
  }
};
