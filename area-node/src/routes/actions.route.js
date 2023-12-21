const { auth, getUser } = require("../middlewares/auth.middleware.js");
const actionController = require("../controllers/action.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get("/", { preHandler: [auth] }, actionController.getActions);
    done();
};
