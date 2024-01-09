const actions = require("../actions");

module.exports = [
    {
        id: "github",
        name: "GitHub",
        actions: [
            {
                id: "new_repo",
                name: "Create a new repository",
                function: actions.githubActions.newUserRepo,
                loop: false,
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
        ],
    },
];
