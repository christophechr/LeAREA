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
                    ]
                },
                {
                    "name": "gitlab",
                    "actions": [
                        {
                            "name": "create_repo",
                            "description": "Creates a new repository for the authenticated GitLab user.",
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
                            "name": "Get_forecast",
                            "description": "Get the forecast for a location."
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
                }
            ]
        },
    };