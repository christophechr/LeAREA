const axios = require('axios');
const qs = require('qs');
const { OAuth2Client } = require('outlook-auth');

const oAuth2Client = new OAuth2Client(
    process.env.OUTLOOK_CLIENT_ID,
    process.env.OUTLOOK_CLIENT_SECRET,
    "http://localhost:3000/outlook/callback"
);

const getOAuthOutlookAddress = async (request, reply) => {
    reply.send({ url: oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://outlook.office.com/IMAP.AccessAsUser.All',
    })});
}

const outlookOAuthCallback = async (request, reply) => {
    try {
        // get code from url params
        const { code } = request.body;

        // Exchange the authorization code for tokens
        const { data } = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', qs.stringify({
            code,
            client_id: process.env.OUTLOOK_CLIENT_ID,
            client_secret: process.env.OUTLOOK_CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/outlook/callback',
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Set the credentials on the OAuth2 client
        oAuth2Client.setCredentials({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            // Add other relevant token properties as needed
        });

        // Save tokens to user or perform any necessary actions
        request.user.outlookToken = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            // Add other relevant token properties as needed
        };

        await request.user.save();

        console.info('Tokens acquired.');
        reply.send({ message: 'Tokens acquired successfully.' });
    } catch (e) {
        console.error(e);
        reply.status(500).send({
            message: e.message,
        });
    }
}

module.exports = {
    getOAuthOutlookAddress,
    outlookOAuthCallback,
};
