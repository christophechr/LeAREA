const triggers = require("../triggers");
const init = require("../init");

module.exports = [
    {
        id: "github",
        name: "Github",
        img: "/public/images/github.png",
        triggers: [
            {
                id: "new_repo",
                name: "When a new repository is created...",
                description: "Triggers when a new repository is created.",
                function: triggers.githubTriggers.newRepo,
                execEach: 10,
                init: init.githubTriggerInit.initNewRepoTrigger,
                params: [],
            },
            {
                id: "new_follower",
                name: "When a follower...",
                description: "Triggers when a follower is added or lost.",
                function: triggers.githubTriggers.newFollower,
                execEach: 10,
                init: init.githubTriggerInit.initNewFollowerTrigger,
                params: [
                    {
                        id: "toCheck",
                        name: "To check",
                        type: "enum",
                        required: true,
                        description: "The type of follower to check.",
                        values: [
                            {
                                name: "New",
                                value: "new",
                            },
                            {
                                name: "Lost",
                                value: "lost",
                            },
                        ],
                    },
                ],
            }
        ]
    },
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
        id: "gmail",
        name: "Gmail",
        img: "/public/images/gmail.webp",
        triggers: [
            {
                id: "email_received",
                name: "When an email is received...",
                description: "Triggers when an email is received from Gmail.",
                execEach: 1,
                params: [],
            },
        ],
    },
    {
        id: "spotify",
        name: "Spotify",
        img: "/public/images/Spotify.webp",
        triggers: [
            {
                id: "is_this_song",
                function: triggers.spotifyTriggers.isThisSong,
                execEach: 5,
                name: "test if the song that is being played is actually the one given as parameter",
                description: "Test the name of the song that is being played",
                params: [
                    {
                        id: "songname",
                        name: "Song Name",
                        type: "string",
                        required: true,
                        description: "give the name of the song that is being played",
                    },
                ],
            },
        ],
    },
    {
        id: "google_calendar",
        name: "Google Calendar",
        img: "/public/images/google_calendar.png",
        triggers: [
            {
                id: "new_event",
                name: "When an event occurs in Google Calendar...",
                description: "Triggers when something happens in Google Calendar.",
                params: [],
            },
        ],
    }
];
