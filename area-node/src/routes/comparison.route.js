const { auth, getUser } = require("../middlewares/auth.middleware.js");
const { getUserFlows } = require("../controllers/comparison.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get("/offer",
        { preHandler: [auth, getUser] },
        getUserFlows
    );
};