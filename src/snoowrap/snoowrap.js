"use strict";
const snoowrap = require("snoowrap");

const r = snoowrap.fromApplicationOnlyAuth({
  userAgent: "Reddit Lite",
  clientId: "ZK38KJJbGQTKABQtAhTFRA",
  deviceId: "DO_NOT_TRACK_THIS_DEVICE",
  grantType: snoowrap.grantType.INSTALLED_CLIENT,
});

r.then((r) => r.getSubmission("2np694").author.name);

export default r;
