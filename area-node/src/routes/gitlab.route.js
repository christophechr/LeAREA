const { auth, getUser } = require("../middlewares/auth.middleware.js");
const gitlabControllers = require("../controllers/gitlab.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get(
        "/",
        { preHandler: [auth, getUser] },
        gitlabControllers.getOAuthGitlabAddress
    );
    fastify.post(
        "/",
        { preHandler: [auth, getUser] },
        gitlabControllers.gitlabOAuthCallback
    );
    done();
};
