const queryString = require("querystring");

const axios = require("axios");

const User = require("../models/user.model.js");

const params = queryString.stringify({
    client_id: process.env.GITLAB_APP_ID,
    redirect_uri: "http://localhost:3000/gitlab",
    scope: "api",
    response_type: "code",
});

const githubLoginUrl = `https://gitlab.com/oauth/authorize?${params}`;

async function getAccessTokenFromCode(code) {
    const { data } = await axios({
        url: "https://gitlab.com/oauth/token",
        method: "post",
        params: {
            client_id: process.env.GITLAB_APP_ID,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:3000/gitlab",
            code,
        },
    });
    /**
     * GitLab returns data as a string we must parse.
     */
    const parsedData = queryString.parse(data);
    console.log(parsedData); // { token_type, access_token, error, error_description }
    if (parsedData.error) throw new Error(parsedData.error_description);
    return parsedData.access_token;
}

const getOAuthGitlabAddress = async (request, reply) => {
    reply.send({ url: githubLoginUrl });
};

const gitlabOAuthCallback = async (request, reply) => {
    const { code } = request.body;

    if (!code) {
        reply.status(400).send({
            message: "Code not provided",
        });
    }
    try {
        const accessToken = await getAccessTokenFromCode(code);
        console.log(accessToken);

        console.log(request.user);

        // Store the access token in the user
        const user = await User.findOneAndUpdate(
            { _id: request.user._id },
            { gitlabToken: accessToken },
            { new: true }
        );
        console.log(user);
        reply.send({
            message: "GitLab token stored",
        });
    } catch (err) {
        console.log(err);
        reply.status(500).send({
            message: err.message,
        });
    }
};

module.exports = {
    getOAuthGitlabAddress,
    gitlabOAuthCallback,
};
