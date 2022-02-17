"use strict";
const snoowrap = require("snoowrap");

// const appOnlyAuth = snoowrap.fromApplicationOnlyAuth({
//   userAgent: "Reddit Lite",
//   clientId: "ZK38KJJbGQTKABQtAhTFRA",
//   deviceId: "DO_NOT_TRACK_THIS_DEVICE",
//   grantType: snoowrap.grantType.INSTALLED_CLIENT,
// });

const appOnlyAuth = new snoowrap({
  userAgent: "reddit lite",
  clientId: "4-Y97TbZyOA9GfC3CGN-Fg",
  clientSecret: "1aQYtS_d1DzkuViaEXsK7VA6AE3ZZQ",
  refreshToken: "56981753-_gDzkAjAMwU9zYCAFYreQFGBAIRhlA",
});

export default appOnlyAuth;
