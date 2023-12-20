const actions = require("../actions");

module.exports = {
    github: {
        name: "GitHub",
        actions: {
            new_repo: {
                name: "Create a new repository",
                function: actions.githubActions.newUserRepo,
                description:
                    "Creates a new repository for the authenticated GitHub user.",
                params: [
                    {
                        id: "name",
                        name: "Repo name",
                        type: "string",
                        required: true,
                        description: "The name of the new repository.",
                    },
                ],
            },
        },
    },
};
