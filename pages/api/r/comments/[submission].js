import appOnlyAuth from "../../../../src/snoowrap/snoowrap";

export default async function handler(req, res) {
  const { submission } = req.query;
  const r = await appOnlyAuth;
  const title = await r.getSubmission(submission).title;
  const subreddit = await r.getSubmission(submission).subreddit.display_name;
  const selftext = await r.getSubmission(submission).selftext;
  const comments = await r.getSubmission(submission).comments;
  // const comments = r.getSubmission(submission).fetchaAll();
  res.status(200).json({ title, subreddit, selftext, comments });
}
