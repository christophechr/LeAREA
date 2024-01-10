const authControllers = require("../controllers/auth.controller.js");
const { auth, getUser } = require("../middlewares/auth.middleware.js");
const outlookControllers = require("../controllers/outlook.controller.js");

module.exports = function (fastify, opts, done) {
    // Endpoint to redirect users to the Outlook authorization page
    fastify.get(
        "/",
        { preHandler: [auth, getUser] },
        outlookControllers.getOAuthOutlookAddress
    );

    // Endpoint to handle the callback from Outlook after user grants permission
    fastify.post(
        "/",
        { preHandler: [auth, getUser] },
        outlookControllers.outlookOAuthCallback
    );

    done();
};