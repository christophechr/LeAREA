const exempleControllers = require("../controllers/exemple.controller.js");
const { auth } = require("../middlewares/exemple.middleware.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get("/", exempleControllers.get);
    fastify.post("/", { preHandler: [auth] }, exempleControllers.post);
    done();
};
