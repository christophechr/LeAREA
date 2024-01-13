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
        id: "time",
        name: "Time",
        img: "/public/images/time.webp",
        triggers: [
            {
                id: "time",
                name: "When the time is...",
                description: "Triggers when the time is equal to the given time.",
                function: triggers.timeTriggers.time,
                execEach: 1,
                params: [
                    {
                        id: "time",
                        name: "Time",
                        type: "datetime",
                        required: true,
                        description: "The time to check.",
                    },
                    {
                        id: "operator",
                        name: "Operator",
                        type: "enum",
                        required: true,
                        description: "The operator to compare the time.",
                        values: [
                            {
                                name: "Greater than",
                                value: "greater_than",
                            },
                            {
                                name: "Less than",
                                value: "less_than",
                            },
                        ],
                    },
                    {
                        id: "timezone",
                        name: "Timezone",
                        type: "enum",
                        required: true,
                        description: "The timezone of the time.",
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
        ],
    }
];
