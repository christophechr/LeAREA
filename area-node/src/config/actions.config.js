const actions = require("../actions");

module.exports = [
    {
        id: "github",
        name: "GitHub",
        img: "/public/images/github.png",
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
    {
        id: "http_request",
        name: "HTTP Request",
        img: "/public/images/http.png",
        actions: [
            {
                id: "get",
                name: "GET",
                function: actions.httpActions.get,
                loop: true,
                description: "Performs a GET request.",
                params: [
                    {
                        id: "url",
                        name: "URL",
                        type: "string",
                        required: true,
                        description: "The URL to perform the GET request.",
                    },
                    {
                        id: "body",
                        name: "Body",
                        type: "string",
                        required: false,
                        description: "The body of the GET request.",
                    },
                    {
                        id: "headers",
                        name: "Headers",
                        type: "string",
                        required: false,
                        description: "The headers of the GET request.",
                    }
                ],
            },
            {
                id: "post",
                name: "POST",
                function: actions.httpActions.post,
                loop: true,
                description: "Performs a POST request.",
                params: [
                    {
                        id: "url",
                        name: "URL",
                        type: "string",
                        required: true,
                        description: "The URL to perform the POST request.",
                    },
                    {
                        id: "body",
                        name: "Body",
                        type: "string",
                        required: false,
                        description: "The body of the POST request.",
                    },
                    {
                        id: "headers",
                        name: "Headers",
                        type: "string",
                        required: false,
                        description: "The headers of the POST request.",
                    }
                ],
            },
            {
                id: "put",
                name: "PUT",
                function: actions.httpActions.put,
                loop: true,
                description: "Performs a PUT request.",
                params: [
                    {
                        id: "url",
                        name: "URL",
                        type: "string",
                        required: true,
                        description: "The URL to perform the PUT request.",
                    },
                    {
                        id: "body",
                        name: "Body",
                        type: "string",
                        required: false,
                        description: "The body of the PUT request.",
                    },
                    {
                        id: "headers",
                        name: "Headers",
                        type: "string",
                        required: false,
                        description: "The headers of the PUT request.",
                    }
                ],
            },
            {
                id: "delete",
                name: "DELETE",
                function: actions.httpActions.delete,
                loop: true,
                description: "Performs a DELETE request.",
                params: [
                    {
                        id: "url",
                        name: "URL",
                        type: "string",
                        required: true,
                        description: "The URL to perform the DELETE request.",
                    },
                    {
                        id: "body",
                        name: "Body",
                        type: "string",
                        required: false,
                        description: "The body of the DELETE request.",
                    },
                    {
                        id: "headers",
                        name: "Headers",
                        type: "string",
                        required: false,
                        description: "The headers of the DELETE request.",
                    }
                ],
            },
            {
                id: "patch",
                name: "PATCH",
                function: actions.httpActions.patch,
                loop: true,
                description: "Performs a PATCH request.",
                params: [
                    {
                        id: "url",
                        name: "URL",
                        type: "string",
                        required: true,
                        description: "The URL to perform the PATCH request.",
                    },
                    {
                        id: "body",
                        name: "Body",
                        type: "string",
                        required: false,
                        description: "The body of the PATCH request.",
                    },
                    {
                        id: "headers",
                        name: "Headers",
                        type: "string",
                        required: false,
                        description: "The headers of the PATCH request.",
                    }
                ],
            },
        ],
    }
];
