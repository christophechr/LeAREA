const {OAuth2Client} = require('google-auth-library');

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/google"
);

const getOAuthGoogleAddress = async (request, reply) => {
    reply.send({ url: oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://mail.google.com/',
    })});
}

const googleOAuthCallback = async (request, reply) => {
    try {

        // get code from url params
        const { code } = request.body;

        // Now that we have the code, use that to acquire tokens.
        const r = await oAuth2Client.getToken(code);

        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);

        request.user.googleToken = r.tokens;

        await request.user.save();

        console.info('Tokens acquired.');
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