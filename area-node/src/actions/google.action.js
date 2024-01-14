const { google } = require('googleapis');

const createEvent = async (user, params) => {
    if (!user || !user.googleToken || !params || !params.start || !params.end || !params.timezone || !params.summary)
        return;

    try {
        const oauth2Client = new google.auth.OAuth2();

        oauth2Client.setCredentials(user.googleToken);

        const calendar = google.calendar({version: 'v3', auth: oauth2Client});

        await calendar.events.insert({
            calendarId: 'primary',
            auth: oauth2Client,
            requestBody: {
                summary: params.summary,
                description: params.description,
                start: {
                    dateTime: params.start,
                    timeZone: params.timezone
                },
                end: {
                    dateTime: params.end,
                    timeZone: params.timezone
                }
            }
        });
    } catch (err) {
        console.log("Cannot create new event");
    }
}

const createCalendar = async (user, params) => {
    if (!user || !user.googleToken || !params || !params.summary)
        return;

    try {
        const oauth2Client = new google.auth.OAuth2();

        oauth2Client.setCredentials(user.googleToken);

        const calendar = google.calendar({version: 'v3', auth: oauth2Client});

        await calendar.calendars.insert({
            auth: oauth2Client,
            requestBody: {
                summary: params.summary,
                description: params.description
            }
        });
    } catch (err) {
        console.log("Cannot create new calendar");
    }
}

module.exports = {
    createEvent,
    createCalendar
};
