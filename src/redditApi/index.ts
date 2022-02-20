import { loadCommentsFromPost, loadMoreCommentsFromPost } from "./post";
import {
  loadMoreSubredditPosts,
  loadSubredditInfo,
  loadSubredditPosts,
} from "./subreddit";

export {
  // SUBREDDIT
  loadSubredditInfo,
  loadSubredditPosts,
  loadMoreSubredditPosts,
  // POST
  loadCommentsFromPost,
  loadMoreCommentsFromPost,
};
