module.exports =
    {
        "client": {
            "host": "localhost",
        },
        "server": {
            "current_time": "2021-03-29T20:00:00Z",
            "services": [
                {
                    "name": "github",
                    "actions": [
                        {
                            "name": "create_repo",
                            "description": "Creates a new repository for the authenticated GitHub user.",
                        }
                    ],
                    "reactions": [
                        {
                            "name": "When a new repository is created...",
                            "description": "Triggers when a new repository is created.",
                        },
                        {
                            "name": "when a follower",
                            "description": "Triggers when a follower is added or lost.",
                        }
                    ]
                },
                {
                    "name": "google Calendar",
                    "actions": [
                        {
                            "name": "create_calendar_event",
                            "description": "Creates a new calendar event for the authenticated Google user.",
                        }
                    ],
                    "reactions": [
                        {
                            "name" : "When an event occurs in Google Calendar...",
                            "description": "Triggers when something happens in Google Calendar.",
                        }
                    ]
                },
                {
                    "name": "gmail",
                    "reactions": [
                        {
                            "name": "when an email is received...",
                            "description": "Triggers when an email is received from Gmail.",
                        }
                    ]
                },
                {
                    "name": "spotify",
                    "actions": [
                        {
                            "name": "add_song_to_playlist",
                            "description": "Adds a song to a playlist for the authenticated Spotify user.",
                        }
                    ]
                },
                {
                    "name": "weather",
                    "reactions": [
                        {
                            "name": "When the temperature value is...",
                            "description": "Triggers a temperature condition.",
                            }
                        ]
                    },
                {
                    "name": "micropaiement",
                    "action": [
                        {
                            "name": "create a new invoice",
                            "description": "Creates a new invoice to receive payments.",
                        },
                        {
                            "name": "Pay an invoice",
                            "description": "fill a BOLT11 invoice and pay it.",
                        }
                    ],
                    "reactions": [
                        {
                            "name": "Check the balance",
                            "description": "Trigger a micropayment condition",
                        }
                    ]
                },
                {
                    "name": "http_requests",
                    "actions": [
                        {
                            "name": "GET",
                            "description": "Performs a GET request.",
                        },
                        {
                            "name": "POST",
                            "description": "Performs a POST request.",
                        },
                        {
                            "name": "PUT",
                            "description": "Performs a PUT request.",
                        },
                        {
                            "name": "DELETE",
                            "description": "Performs a DELETE request.",
                        },
                        {
                            "name": "PATCH",
                            "description": "Performs a PATCH request.",
                        }
                    ],
                },
            ],
        },
    };
