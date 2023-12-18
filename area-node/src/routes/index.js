module.exports = (fastify, opts, done) => {
    fastify.register(require("./auth.route.js"), { prefix: "/auth" });
    fastify.register(require('@fastify/cors'), {
        origin: '*',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type',
      });
    done();
};
