const authControllers = require("../controllers/auth.controller.js");

// preHandlers are like middleware !
module.exports = function (fastify, opts, done) {
    fastify.post("/register", authControllers.register);
    fastify.post("/login", authControllers.login);
    done();
};
