const aboutController = require('../controllers/about.controller');

module.exports = function (fastify, opts, done) {
    fastify.get('/', aboutController.getAboutJson);
    done();
}