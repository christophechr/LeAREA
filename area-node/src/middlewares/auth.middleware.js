const { verifyJwt } = require("../utils/jwt.utils");

const auth = (request, reply, next) => {
    if (request.headers && request.headers.authorization) {
        const token = request.headers.authorization.split(" ")[1];

        if (!token) {
            reply.code(401).send({ error: "Unauthorized" });
        }

        try {
            const decoded = verifyJwt(token);

            request.user = decoded;

            next();
        } catch (err) {
            reply.code(401).send({ error: "Unauthorized" });
        }
    } else {
        reply.code(401).send({ error: "Unauthorized" });
    }
};

module.exports = {
    auth,
};
