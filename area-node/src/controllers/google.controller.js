const {OAuth2Client} = require('google-auth-library');

// import axios
const axios = require("axios");

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/google"
);

const getOAuthGoogleAddress = async (request, reply) => {
    reply.send({ url: oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/userinfo.email',
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

        // Get user email
        const resEmail = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${r.tokens.access_token}`,
            },
        });

        console.log(resEmail.data);

        console.log(`Email registered: ${resEmail.data.email}`);

        request.user.googleEmail = resEmail.data.email;

        // Watch for new emails from API https://gmail.googleapis.com/gmail/v1/users/{userId}/watch
        const res = await axios.post("https://gmail.googleapis.com/gmail/v1/users/me/watch", {
            topicName: "projects/area-410711/topics/emailReceived",
            labelIds: ["INBOX"],
        }, {
            headers: {
                Authorization: `Bearer ${r.tokens.access_token}`,
            },
        });

        // Check res code
        if (res.status !== 200) {
            reply.status(res.status).send({
                message: "Email subscription failed. Retry later."
            });
            return;
        }

        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);

        request.user.googleToken = r.tokens;

        await request.user.save();

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
}
