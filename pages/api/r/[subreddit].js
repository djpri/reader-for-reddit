import Snoowrap from "snoowrap";

const appOnlyAuth = Snoowrap.fromApplicationOnlyAuth({
  userAgent: "Reddit Lite",
  clientId: "ZK38KJJbGQTKABQtAhTFRA",
  deviceId: "DO_NOT_TRACK_THIS_DEVICE",
  grantType: Snoowrap.grantType.INSTALLED_CLIENT,
});

export default async function handler(req, res) {
  const { subreddit } = req.query;
  // console.log(req.query);
  const r = await appOnlyAuth;
  const data = await r.getSubreddit(subreddit).getHot({ limit: 5 });
  res.status(200).json({ data });
}
