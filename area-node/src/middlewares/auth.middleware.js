const { verifyJwt } = require("../utils/jwt.utils");
const User = require("../models/user.model.js");

const getUser = async (request, reply) => {
    const user = await User.findById(request.userId);

    request.user = user;
};

const auth = (request, reply, next) => {
    if (request.headers && request.headers.authorization) {
        const token = request.headers.authorization.split(" ")[1];

        if (!token) {
            reply.code(401).send({ error: "Unauthorized" });
            return;
        }

        try {
            const decoded = verifyJwt(token);

            request.userId = decoded.userId;
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
    getUser,
};
