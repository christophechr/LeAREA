const axios = require("axios");
const User = require("../models/user.model.js");

const newRepo = async (user, params) => {

    if (!user || !user.githubToken)
        return false;

    try {
        let count = 0;
        let i = 1;

        while (true) {
            const { data } = await axios({
                url: "https://api.github.com/user/repos",
                method: "get",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${user.githubToken}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
                params: {
                    visibility: "all",
                    per_page: 100,
                    page: i++
                }
            });

            if (!data || !data.length)
                break;

            count += data.length;

            if (data.length < 100)
                break;
        }

        if (count !== user.githubRepoCount) {
            const result = count > user.githubRepoCount;

            user.githubRepoCount = count;
            await user.save();

            return result;
        }
    } catch (err) {
        console.log("Cannot trigger new repository");
        return false
    }
    return false;
}

const newFollower = async (user, params) => {

    if (!user || !user.githubToken || !params || !params.toCheck)
        return false;

    try {
        const { data } = await axios({
            url: "https://api.github.com/user",
            method: "get",
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${user.githubToken}`,
                "X-GitHub-Api-Version": "2022-11-28",
            }
        });

        if (!data || data.followers === undefined) {
            console.log("Cannot init new follower trigger: CANCELLED");
            return false;
        }

        if (data.followers !== user.githubFollowersCount) {
            let result;

            console.log("Followers count: " + data.followers);
            console.log("Followers count: " + user.githubFollowersCount);

            switch (params.toCheck) {
                case ('new'):
                    result = data.followers > user.githubFollowersCount;
                    break;
                case ('lost'):
                    result = data.followers < user.githubFollowersCount;
                    break;
                default:
                    result = false;
                    break;
            }

            await User.findByIdAndUpdate(user._id, { githubFollowersCount: data.followers });

            await user.save();

            return result;
        }
    } catch (err) {
        console.log("Cannot trigger new repository");
        return false;
    }
    return false;
}

module.exports = {
    newRepo,
    newFollower,
}
