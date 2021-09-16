"use strict";
const snoowrap = require("snoowrap");

const appOnlyAuth = snoowrap.fromApplicationOnlyAuth({
  userAgent: "Reddit Lite",
  clientId: "ZK38KJJbGQTKABQtAhTFRA",
  deviceId: "DO_NOT_TRACK_THIS_DEVICE",
  grantType: snoowrap.grantType.INSTALLED_CLIENT,
});

export default appOnlyAuth;
