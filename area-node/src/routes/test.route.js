const testController = require("../controllers/test.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.get("/red", testController.getRed);
    fastify.get("/green", testController.getGreen);
    fastify.get("/blue", testController.getBlue);
    done();
};
