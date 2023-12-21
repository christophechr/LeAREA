const { auth, getUser } = require("../middlewares/auth.middleware.js");
const triggerController = require("../controllers/trigger.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get("/", { preHandler: [auth] }, triggerController.getTriggers);
    done();
};
