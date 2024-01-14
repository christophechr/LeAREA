const authControllers = require("../controllers/auth.controller.js");
const { auth, getUser } = require("../middlewares/auth.middleware.js");
const SpotifyCredentials = require("../controllers/spotify.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get(
        "/",
        { preHandler: [auth, getUser] },
        SpotifyCredentials.redirectToAuthCodeFlow
    );
    fastify.post(
        "/",
        { preHandler: [auth, getUser] },
        SpotifyCredentials.registerToken
    );
    done();
};