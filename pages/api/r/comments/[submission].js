import Snoowrap from "snoowrap";

const appOnlyAuth = Snoowrap.fromApplicationOnlyAuth({
  userAgent: "Reddit Lite",
  clientId: "ZK38KJJbGQTKABQtAhTFRA",
  deviceId: "DO_NOT_TRACK_THIS_DEVICE",
  grantType: Snoowrap.grantType.INSTALLED_CLIENT,
});

export default async function handler(req, res) {
  const { submission } = req.query;
  const r = await appOnlyAuth;
  const title = await r.getSubmission("piwroz").title;
  const comments = await r.getSubmission("piwroz").comments;
  res.status(200).json({ title, comments });
}
