module.exports = (fastify, opts, done) => {
    fastify.register(require("./exemple.route.js"), { prefix: "/exemple" });
    done();
};

/**
 * /auth:
 *    /auth/register
 *    /auth/login
 */
