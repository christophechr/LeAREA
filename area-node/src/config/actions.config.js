const actions = require("../actions");

module.exports = [
    {
        id: "google_calendar",
        name: "Google Calendar",
        img: "/public/images/google_calendar.png",
        actions: [
            {
                id: "new_event",
                name: "New event",
                function: actions.googleActions.createEvent,
                loop: false,
                description: "Create a new event in Google Calendar.",
                params: [
                    {
                        id: "startTime",
                        name: "Start time",
                        type: "string",
                        required: true,
                        description: "The start time of the event.",
                    },
                    {
                        id: "endTime",
                        name: "End time",
                        type: "string",
                        required: true,
                        description: "The end time of the event.",
                    },
                    {
                        id: "summary",
                        name: "Summary",
                        type: "string",
                        required: true,
                        description: "The summary of the event.",
                    },
                    {
                        id: "description",
                        name: "Description",
                        type: "string",
                        required: false,
                        description: "The description of the event.",
                    },
                    {
                        id: "timezone",
                        name: "Timezone",
                        type: "enum",
                        required: true,
                        description: "The timezone of the event.",
                        values: [
                            {
                                name: "Africa/Casablanca",
                                value: "Africa/Casablanca"
                            },
                            {
                                name: "Africa/Johannesburg",
                                value: "Africa/Johannesburg"
                            },
                            {
                                name: "Africa/Nairobi",
                                value: "Africa/Nairobi"
                            },
                            {
                                name: "Africa/Tripoli",
                                value: "Africa/Tripoli"
                            },
                            {
                                name: "Africa/Tunis",
                                value: "Africa/Tunis"
                            },
                            {
                                name: "America/Chicago",
                                value: "America/Chicago"
                            },
                            {
                                name: "America/Costa_Rica",
                                value: "America/Costa_Rica"
                            },
                            {
                                name: "America/Denver",
                                value: "America/Denver"
                            },
                            {
                                name: "America/Detroit",
                                value: "America/Detroit"
                            },
                            {
                                name: "America/Guatemala",
                                value: "America/Guatemala"
                            },
                            {
                                name: "America/Halifax",
                                value: "America/Halifax"
                            },
                            {
                                name: "America/Indiana/Indianapolis",
                                value: "America/Indiana/Indianapolis"
                            },
                            {
                                name: "America/Los_Angeles",
                                value: "America/Los_Angeles"
                            },
                            {
                                name: "America/Mexico_City",
                                value: "America/Mexico_City"
                            },
                            {
                                name: "America/New_York",
                                value: "America/New_York"
                            },
                            {
                                name: "America/Sao_Paulo",
                                value: "America/Sao_Paulo"
                            },
                            {
                                name: "America/Toronto",
                                value: "America/Toronto"
                            },
                            {
                                name: "America/Vancouver",
                                value: "America/Vancouver"
                            },
                            {
                                name: "Asia/Dubai",
                                value: "Asia/Dubai"
                            },
                            {
                                name: "Asia/Gaza",
                                value: "Asia/Gaza"
                            },
                            {
                                name: "Asia/Hong_Kong",
                                value: "Asia/Hong_Kong"
                            },
                            {
                                name: "Asia/Jerusalem",
                                value: "Asia/Jerusalem"
                            },
                            {
                                name: "Asia/Qatar",
                                value: "Asia/Qatar"
                            },
                            {
                                name: "Asia/Riyadh",
                                value: "Asia/Riyadh"
                            },
                            {
                                name: "Asia/Seoul",
                                value: "Asia/Seoul"
                            },
                            {
                                name: "Asia/Shanghai",
                                value: "Asia/Shanghai"
                            },
                            {
                                name: "Asia/Singapore",
                                value: "Asia/Singapore"
                            },
                            {
                                name: "Asia/Taipei",
                                value: "Asia/Taipei"
                            },
                            {
                                name: "Asia/Tokyo",
                                value: "Asia/Tokyo"
                            },
                            {
                                name: "Europe/Athens",
                                value: "Europe/Athens"
                            },
                            {
                                name: "Europe/Berlin",
                                value: "Europe/Berlin"
                            },
                            {
                                name: "Europe/Brussels",
                                value: "Europe/Brussels"
                            },
                            {
                                name: "Europe/Bucharest",
                                value: "Europe/Bucharest"
                            },
                            {
                                name: "Europe/Budapest",
                                value: "Europe/Budapest"
                            },
                            {
                                name: "Europe/Helsinki",
                                value: "Europe/Helsinki"
                            },
                            {
                                name: "Europe/Istanbul",
                                value: "Europe/Istanbul"
                            },
                            {
                                name: "Europe/Kaliningrad",
                                value: "Europe/Kaliningrad"
                            },
                            {
                                name: "Europe/Kirov",
                                value: "Europe/Kirov"
                            },
                            {
                                name: "Europe/Kyiv",
                                value: "Europe/Kyiv"
                            },
                            {
                                name: "Europe/Lisbon",
                                value: "Europe/Lisbon"
                            },
                            {
                                name: "Europe/London",
                                value: "Europe/London"
                            },
                            {
                                name: "Europe/Madrid",
                                value: "Europe/Madrid"
                            },
                            {
                                name: "Europe/Minsk",
                                value: "Europe/Minsk"
                            },
                            {
                                name: "Europe/Moscow",
                                value: "Europe/Moscow"
                            },
                            {
                                name: "Europe/Paris",
                                value: "Europe/Paris"
                            },
                            {
                                name: "Europe/Prague",
                                value: "Europe/Prague"
                            },
                            {
                                name: "Europe/Rome",
                                value: "Europe/Rome"
                            },
                            {
                                name: "Europe/Vienna",
                                value: "Europe/Vienna"
                            },
                            {
                                name: "Europe/Vilnius",
                                value: "Europe/Vilnius"
                            },
                            {
                                name: "Europe/Warsaw",
                                value: "Europe/Warsaw"
                            },
                            {
                                name: "Europe/Zurich",
                                value: "Europe/Zurich"
                            },
                            {
                                name: "Indian/Mauritius",
                                value: "Indian/Mauritius"
                            },
                            {
                                name: "Pacific/Easter",
                                value: "Pacific/Easter"
                            }
                        ],
                    }
                ],
            },
            {
                id: "new_calendar",
                name: "New calendar",
                function: actions.googleActions.createCalendar,
                loop: false,
                description: "Create a new calendar in Google Calendar.",
                params: [
                    {
                        id: "summary",
                        name: "Summary",
                        type: "string",
                        required: true,
                        description: "The summary of the calendar.",
                    },
                    {
                        id: "description",
                        name: "Description",
                        type: "string",
                        required: false,
                        description: "The description of the calendar.",
                    },
                ],

            }
        ],
    },
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
