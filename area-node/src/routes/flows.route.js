const { auth, getUser } = require("../middlewares/auth.middleware.js");
const flowsControllers = require("../controllers/flows.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get(
        "/",
        { preHandler: [auth, getUser] },
        flowsControllers.getUserFlows
    );
    fastify.post(
        "/",
        { preHandler: [auth, getUser] },
        flowsControllers.createFlow
    );
    fastify.delete(
        "/:flowId",
        { preHandler: [auth, getUser] },
        flowsControllers.deleteFlow
    );
    fastify.put(
        "/:flowId",
        { preHandler: [auth, getUser] },
        flowsControllers.updateFlow
    )
    done();
};