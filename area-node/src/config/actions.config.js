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
        id: "micpmt",
        name: "Micropayment",
        img: "/public/images/micropayment.png",
        actions: [
            {
                id: "newInvoice",
                name: "Create a new invoice",
                function: actions.micpmtActions.newInvoice,
                description:
                    "Creates a new invoice to receive payments.",
                params: [
                    {
                        id: "memo",
                        name: "Note",
                        type: "string",
                        required: true,
                        description: "Leave a note on the invoice.",
                    },
                    {
                        id: "amount",
                        name: "Amount",
                        type: "integer",
                        required: true,
                        description: "The amount to receive.",
                    },
                ],
            },
            {
                id: "payInvoice",
                name: "Pay an invoice",
                function: actions.micpmtActions.payInvoice,
                description:
                    "Fill a BOLT11 invoice and pay it.",
                params: [
                    {
                        id: "bolt11",
                        name: "BOLT11 Invoice",
                        type: "string",
                        required: true,
                        description: "The BOLT11 invoice to pay.",
                    },
                ],
            }
        ],
    },
];
