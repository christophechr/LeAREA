const queryString = require("querystring");

const axios = require("axios");

const User = require("../models/user.model.js");

const params = queryString.stringify({
    client_id: process.env.GITHUB_APP_ID,
    redirect_uri: "http://localhost:3000/auth/github",
    scope: ["read:user", "user:email"].join(" "), // space seperated string
    allow_signup: true,
});

const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

async function getAccessTokenFromCode(code) {
    const { data } = await axios({
        url: "https://github.com/login/oauth/access_token",
        method: "get",
        params: {
            client_id: process.env.GITHUB_APP_ID,
            client_secret: process.env.GITHUB_SECRET,
            redirect_uri: "http://localhost:3000/auth/github",
            code,
        },
    });
    /**
     * GitHub returns data as a string we must parse.
     */
    const parsedData = queryString.parse(data);
    console.log(parsedData); // { token_type, access_token, error, error_description }
    if (parsedData.error) throw new Error(parsedData.error_description);
    return parsedData.access_token;
}

const github = async (request, reply) => {
    console.log(request.query);

    // Check if the request contains the code query parameter
    if (!request.query.code) {
        console.log("no code, redirecting to github");
        reply.send({ url: githubLoginUrl });
    } else {
        // If the code parameter is present, exchange it for an access token
        const { code } = request.query;

        try {
            const accessToken = await getAccessTokenFromCode(code);
            console.log(accessToken);

            console.log(request.user);

            // Store the access token in the user
            const user = await User.findOneAndUpdate(
                { _id: request.user.userId },
                { githubToken: accessToken },
                { new: true }
            );
            console.log(user);
            reply.send({
                message: "GitHub token stored",
            });
        } catch (err) {
            console.log(err);
            reply.status(500).send({
                message: err.message,
            });
        }
    }
};

module.exports = {
    github,
};
