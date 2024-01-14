const {OAuth2Client} = require('google-auth-library');

// import axios
const axios = require("axios");
const Flow = require("../models/flow.model");
const User = require("../models/user.model");
const {executeAction} = require("../utils/actions.utils");

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.FRONT_URL}/google`,
);

const getOAuthGoogleAddress = async (request, reply) => {
    reply.send({ url: oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/calendar',
        ],
    })});
}

const googleOAuthCallback = async (request, reply) => {
    try {

        // get code from url params
        const { code } = request.body;

        console.log(code);

        // Now that we have the code, use that to acquire tokens.
        const r = await oAuth2Client.getToken(code);

        if (!r.tokens) {
            reply.status(400).send({
                message: "Google token not provided",
            });
            return;
        }

        request.user.googleToken = r.tokens;

        await request.user.save();

        reply.send({
            message: "Google token stored",
        });

        console.log("Google token stored");

    } catch (e) {
        console.error("Google token storage failed");
        // console.error(e);
        // reply.status(500).send({
        //     message: e.message,
        // });
    }
}

const calendarNotifications = async (request, reply) => {
    try {
        console.log(request.headers);
        console.log("User id: " + request.headers['x-goog-channel-id']);

        User.findById(request.headers['x-goog-channel-id']).then(async (user) => {
            for (const flowId of user.flows) {
                const flow = await Flow.findById(flowId);

                if (flow && flow.trigger.id === "google_calendar.new_event") {
                    await executeAction(flow, user);
                }
            }
        }).catch((err) => {
            console.log(err);
        });

        reply.send({
            message: "Calendar notification received",
        });
    } catch (e) {
        console.error(e);
        reply.status(500).send({
            message: e.message,
        });
    }
}

module.exports = {
    getOAuthGoogleAddress,
    googleOAuthCallback,
    calendarNotifications,
}
