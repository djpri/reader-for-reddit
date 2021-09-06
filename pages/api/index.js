const snoowrap = require("snoowrap");

const appOnlyAuth = snoowrap.fromApplicationOnlyAuth({
  userAgent: "Reddit Lite",
  clientId: "ZK38KJJbGQTKABQtAhTFRA",
  deviceId: "DO_NOT_TRACK_THIS_DEVICE",
  grantType: snoowrap.grantType.INSTALLED_CLIENT,
});

export default async function handler(req, res) {
  const r = await appOnlyAuth;
  console.log(r.accessToken);
  const posts = await r.getHot("liverpoolfc");
  res.status(200).json({ posts });
}
