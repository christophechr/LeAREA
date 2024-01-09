const queryString = require("querystring");

const axios = require("axios");

const User = require("../models/user.model.js");

const params = queryString.stringify({
    client_id: process.env.GITHUB_APP_ID,
    redirect_uri: "http://localhost:3000/auth/github",
    scope: ["read:user", "user:email", "repo", "workflow"].join(" "), // space seperated string
    allow_signup: true,
});



module.exports = {
    accountToken,
};
