const triggers = require("../triggers");

module.exports = [
    {
        id: "weather",
        name: "Weather",
        img: "/public/images/weather.png",
        triggers: [
            {
                id: "temperature",
                name: "When the temperature value is...",
                description: "Triggers a temperature condition.",
                function: triggers.weatherTriggers.temperature,
                execEach: 5,
                params: [
                    {
                        id: "location",
                        name: "City location",
                        type: "string",
                        required: true,
                        description: "The city location to check the weather.",
                    },
                    {
                        id: "operator",
                        name: "Operator",
                        type: "enum",
                        required: true,
                        description: "The operator to compare the temperature.",
                        values: [
                            {
                                name: "Equal",
                                value: "equal",
                            },
                            {
                                name: "Greater than",
                                value: "greater_than",
                            },
                            {
                                name: "Less than",
                                value: "less_than",
                            },
                            {
                                name: "Greater than or equal",
                                value: "greater_than_or_equal",
                            },
                            {
                                name: "Less than or equal",
                                value: "less_than_or_equal",
                            },
                        ],
                    },
                    {
                        id: "temperature",
                        name: "Temperature",
                        type: "number",
                        required: true,
                        description: "The temperature to check.",
                    },
                    {
                        id: "unit",
                        name: "Unit",
                        type: "enum",
                        required: true,
                        description: "The unit of the temperature.",
                        values: [
                            {
                                name: "Celsius",
                                value: "celsius",
                            },
                            {
                                name: "Fahrenheit",
                                value: "fahrenheit",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "micpmt",
        name: "Micropayment",
        triggers: [
            // Not implemented, can be erased
            // {
            //     id: "incommingPayment",
            //     name: "When an incomming payment is received...",
            //     description: "Triggers a micropayment condition.",
            //     function: triggers.micpmtTriggers.incommingPayment,
            //     params: [
            //         {
            //             id: "operator",
            //             name: "Operator",
            //             type: "enum",
            //             required: true,
            //             description: "The operator to compare the amount.",
            //             values: [
            //                 {
            //                     name: "Equal",
            //                     value: "equal",
            //                 },
            //                 {
            //                     name: "Greater than",
            //                     value: "greater_than",
            //                 },
            //                 {
            //                     name: "Less than",
            //                     value: "less_than",
            //                 },
            //                 {
            //                     name: "Greater than or equal",
            //                     value: "greater_than_or_equal",
            //                 },
            //                 {
            //                     name: "Less than or equal",
            //                     value: "less_than_or_equal",
            //                 },
            //             ]
            //         },
            //         {
            //             id: "value",
            //             name: "Value",
            //             type: "number",
            //             required: true,
            //             description: "The value to compare the last payment.",
            //         },
            //     ]
            // },
            {
                id: "balance",
                name: "Check the balance...",
                description: "Triggers a micropayment condition.",
                function: triggers.micpmtTriggers.balance,
                params: [
                    {
                        id: "operator",
                        name: "Operator",
                        type: "enum",
                        required: true,
                        description: "The operator to compare the amount.",
                        values: [
                            {
                                name: "Equal",
                                value: "equal",
                            },
                            {
                                name: "Greater than",
                                value: "greater_than",
                            },
                            {
                                name: "Less than",
                                value: "less_than",
                            },
                            {
                                name: "Greater than or equal",
                                value: "greater_than_or_equal",
                            },
                            {
                                name: "Less than or equal",
                                value: "less_than_or_equal",
                            },
                        ]
                    },
                    {
                        id: "value",
                        name: "Value",
                        type: "number",
                        required: true,
                        description: "The value to compare the balance.",
                    },
                ]
            },
        ]
    }
];
