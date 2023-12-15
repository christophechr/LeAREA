module.exports = (fastify, opts, done) => {
    fastify.register(require("./auth.route.js"), { prefix: "/auth" });
    done();
};
