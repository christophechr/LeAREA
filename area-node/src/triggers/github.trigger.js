const axios = require("axios");
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

module.exports = {
    newRepo,
}
