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
                            "params": [
                                {
                                    "id": "name",
                                    "name": "Repo name",
                                    "type": "string",
                                    "required": true,
                                    "description": "The name of the new repository.",
                                }
                            ]
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
                            "params": [
                                {
                                    "id": "toCheck",
                                    "name": "To check",
                                    "type": "enum",
                                    "required": true,
                                    "description": "The type of follower to check.",
                                "values": [
                                    {
                                        "name": "New",
                                        "value": "new",
                                    },
                                    {
                                        "name": "Lost",
                                        "value": "lost",
                                    },
                                    ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "google",
                    "actions": [
                        {
                            "name": "create_calendar_event",
                            "description": "Creates a new calendar event for the authenticated Google user.",
                            "params": [
                                {
                                    "id": "name",
                                    "name": "Event name",
                                    "type": "string",
                                    "required": true,
                                    "description": "The name of the new event.",
                                },
                                {
                                    "id": "date",
                                    "name": "Event date",
                                    "type": "date",
                                    "required": true,
                                    "description": "The date of the new event.",
                                },
                                {
                                    "id": "time",
                                    "name": "Event time",
                                    "type": "time",
                                    "required": true,
                                    "description": "The time of the new event.",
                                }
                            ]
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
                            "params": [
                                {
                                    "id": "playlist_id",
                                    "name": "Playlist ID",
                                    "type": "string",
                                    "required": true,
                                    "description": "The ID of the playlist to add the song to.",
                                },
                                {
                                    "id": "song_id",
                                    "name": "Song ID",
                                    "type": "string",
                                    "required": true,
                                    "description": "The ID of the song to add to the playlist.",
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "weather",
                    "reactions": [
                        {
                            "name": "When the temperature value is...",
                            "description": "Triggers a temperature condition.",
                            "params": [
                                    {
                                        "id": "location",
                                        "name": "City location",
                                        "type": "string",
                                        "required": true,
                                        "description": "The city location to check the weather.",
                                    },
                                    {
                                        "id": "operator",
                                        "name": "Operator",
                                        "type": "enum",
                                        "required": true,
                                        "description": "The operator to compare the temperature.",
                                        "values": [
                                            {
                                                "name": "Equal",
                                                "value": "equal",
                                            },
                                            {
                                                "name": "Greater than",
                                                "value": "greater_than",
                                            },
                                            {
                                                "name": "Less than",
                                                "value": "less_than",
                                            },
                                            {
                                                "name": "Greater than or equal",
                                                "value": "greater_than_or_equal",
                                            },
                                            {
                                                "name": "Less than or equal",
                                                "value": "less_than_or_equal",
                                            },
                                            {
                                                "id": "location",
                                                "name": "City location",
                                                "type": "string",
                                                "required": true,
                                                "description": "The city location to check the weather.",
                                            },
                                            {
                                                "id": "operator",
                                                "name": "Operator",
                                                "type": "enum",
                                                "required": true,
                                                "description": "The operator to compare the temperature.",
                                                "values": [
                                                    {
                                                        "name": "Equal",
                                                        "value": "equal",
                                                    },
                                                    {
                                                        "name": "Greater than",
                                                        "value": "greater_than",
                                                    },
                                                    {
                                                        "name": "Less than",
                                                        "value": "less_than",
                                                    },
                                                    {
                                                        "name": "Greater than or equal",
                                                        "value": "greater_than_or_equal",
                                                    },
                                                    {
                                                        "name": "Less than or equal",
                                                        "value": "less_than_or_equal",
                                                    },
                                                ],
                                                }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                {
                    "name": "date",
                    "reactions": [
                        {
                            "name": "get_current_date",
                            "description": "Gets the current date."
                        }
                    ]
                },
                {
                    "name": "micropaiement",
                    "action": [
                        {
                            "name": "create a new invoice",
                            "description": "Creates a new invoice to receive payments.",
                            "params": [
                                {
                                    "id": "memo",
                                    "name": "Note",
                                    "type": "string",
                                    "required": true,
                                    "description": "Leave a note on the invoice.",
                                },
                                {
                                    "id": "amount",
                                    "name": "Amount",
                                    "type": "integer",
                                    "required": true,
                                    "description": "The amount to receive.",
                                },
                            ],
                        },
                        {
                            "name": "Pay an invoice",
                            "description": "fill a BOLT11 invoice and pay it.",
                            "params": [
                                {
                                    "id": "bolt11",
                                    "name": "BOLT11 Invoice",
                                    "type": "string",
                                    "required": true,
                                    "description": "The BOLT11 invoice to pay.",
                                },
                            ],
                        }
                    ],
                    "reaction": [
                        {
                            "name": "Check the balance",
                            "description": "Trigger a micropayment condition",
                            "params": [
                                {
                                    "id": "operator",
                                    "name": "Operator",
                                    "type": "enum",
                                    "required": true,
                                    "description": "The operator to compare the amount.",
                                    "values": [
                                        {
                                            "name": "Equal",
                                            "value": "equal",
                                        },
                                        {
                                            "name": "Greater than",
                                            "value": "greater_than",
                                        },
                                        {
                                            "name": "Less than",
                                            "value": "less_than",
                                        },
                                        {
                                            "name": "Greater than or equal",
                                            "value": "greater_than_or_equal",
                                        },
                                        {
                                            "name": "Less than or equal",
                                            "value": "less_than_or_equal",
                                        },
                                    ],
                                },
                            ]
                        }
                    ]
                }
            ]
        },
    };