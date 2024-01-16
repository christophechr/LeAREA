const axios = require("axios");

const initNewRepoTrigger = async (user) => {
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

        user.githubRepoCount = count;

        await user.save();
    } catch (err) {
        console.log("Cannot init new repo trigger");
        return false
    }
    return true;
}

const initNewFollowerTrigger = async (user) => {
    if (!user || !user.githubToken)
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

        console.log("Followers count: " + data.followers);

        user.githubFollowersCount = data.followers;

        await user.save();
    } catch (err) {
        console.log("Cannot init new follower trigger");
        return false
    }
    return true;
}

module.exports = {
    initNewRepoTrigger,
    initNewFollowerTrigger,
}