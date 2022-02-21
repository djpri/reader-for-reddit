import { loadPostDetailsAndComments, loadMoreCommentsFromPost } from "./post";
import { loadSubredditInfo, loadSubredditPosts } from "./subreddit";

export {
  // SUBREDDIT
  loadSubredditInfo,
  loadSubredditPosts,
  // POST
  loadPostDetailsAndComments as loadCommentsFromPost,
  loadMoreCommentsFromPost,
};
