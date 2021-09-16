import appOnlyAuth from "../../../src/snoowrap/snoowrap";

export default async function handler(req, res) {
  const { subreddit } = req.query;
  // console.log(req.query);
  const r = await appOnlyAuth;
  const data = await r.getSubreddit(subreddit).getHot({ limit: 25 });
  res.status(200).json({ data });
}
