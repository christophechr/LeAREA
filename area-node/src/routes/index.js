module.exports = (fastify, opts, done) => {
    fastify.register(require("./flows.route.js"), { prefix: "/flows" });
    fastify.register(require("./auth.route.js"), { prefix: "/auth" });
    fastify.register(require("./triggers.route.js"), { prefix: "/triggers" });
    fastify.register(require("./actions.route.js"), { prefix: "/actions" });
    done();
};
