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
                    {
                        id: "description",
                        name: "Description",
                        type: "string",
                        required: false,
                        description: "The description of the new repository.",
                    },
                    {
                        id: "private",
                        name: "Private",
                        type: "boolean",
                        required: false,
                        description:
                            "Whether the repository should be private or not.",
                    },
                    {
                        id: "has_issues",
                        name: "Issues",
                        type: "boolean",
                        required: false,
                        description:
                            "Whether the repository should have issues enabled or not.",
                    },
                    {
                        id: "has_projects",
                        name: "Projects",
                        type: "boolean",
                        required: false,
                        description:
                            "Whether the repository should have projects enabled or not.",
                    },
                    {
                        id: "has_wiki",
                        name: "Wiki",
                        type: "boolean",
                        required: false,
                        description:
                            "Whether the repository should have wiki enabled or not.",
                    },
                ],
            },
        },
    },
};
