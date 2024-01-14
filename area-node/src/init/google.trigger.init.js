const axios = require("axios");

const initEmailReceivedTrigger = async (user) => {
    try {
        const resEmail = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${user.googleToken.access_token}`,
            },
        });

        if (resEmail.status !== 200) {
            console.log("User email recuperation failed");
            return false;
        }

        console.log(`Email registered: ${resEmail.data.email}`);

        user.googleEmail = resEmail.data.email;

        await user.save();

        console.log("User token: " +user.googleToken.access_token);

        // Watch for new emails from API https://gmail.googleapis.com/gmail/v1/users/{userId}/watch
        const res = await axios.post("https://gmail.googleapis.com/gmail/v1/users/me/watch", {
            topicName: "projects/area-410711/topics/emailReceived",
            labelIds: ["INBOX"],
        }, {
            headers: {
                Authorization: `Bearer ${user.googleToken.access_token}`,
            },
        });

        // Check res code
        if (res.status !== 200) {
            console.error("Email subscription failed");
            return false;
        }
    } catch (e) {
        console.log("Email subscription failed");
        return false;
    }
    console.log("Email subscription success");
    return true;
}

const initNewCalendarEventTrigger = async (user) => {
    try {
        const calendarListener = await axios.request({
            url: "https://www.googleapis.com/calendar/v3/calendars/primary/events/watch",
            method: "post",
            headers: {
                Authorization: `Bearer ${user.googleToken.access_token}`,
            },
            data: {
                id: user._id.toString(),
                type: "web_hook",
                address: `https://area-backend-production.up.railway.app/google/calendar`,
            }
        });

        if (calendarListener.status !== 200) {
            console.error("Calendar subscription failed");
            return false;
        }
    } catch (e) {
        console.error("Calendar subscription failed");
        return false;
    }
    console.log("Calendar subscription success");
    return true;
}

module.exports = {
    initEmailReceivedTrigger,
    initNewCalendarEventTrigger,
}