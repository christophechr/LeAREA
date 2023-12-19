var github = require("octonode");

// Import axios
const axios = require("axios");

const getGithubClient = (user, params) => {
    if (!user || !user.githubToken) {
        throw new Error("No GitHub token provided");
    }

    let client = github.client(user.githubToken);

    client.get("/user", {}, function (err, status, body, headers) {
        console.log(body); //json object
    });
};

const newUserRepo = async (user, params) => {
    if (!user || !user.githubToken) {
        throw new Error("No GitHub token provided");
    }

    if (!params) {
        throw new Error("No parameters provided");
    }

    if (!params.name) {
        throw new Error("No repo name provided");
    }

    const { data } = await axios({
        url: "https://api.github.com/user/repos",
        method: "post",
        headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${user.githubToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
        },
        data: {
            name: params.name,
            description: params.description,
            homepage: params.homepage,
            private: params.private,
            has_issues: params.has_issues,
            has_projects: params.has_projects,
            has_wiki: params.has_wiki,
            has_discussions: params.has_discussions,
        },
    });

    console.log(data);
};

module.exports = {
    getGithubClient,
};
