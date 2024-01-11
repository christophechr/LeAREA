const authControllers = require("../controllers/auth.controller.js");
const { auth, getUser } = require("../middlewares/auth.middleware.js");
const googleControllers = require("../controllers/google.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get(
        "/",
        { preHandler: [auth, getUser] },
        googleControllers.getOAuthGoogleAddress
    );
    fastify.post(
        "/",
        { preHandler: [auth, getUser] },
        googleControllers.googleOAuthCallback
    );
    done();
};
