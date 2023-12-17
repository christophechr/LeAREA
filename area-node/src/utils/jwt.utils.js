const { sign, verify } = require("jsonwebtoken");

const createJwt = (userId, email) => {
    return sign({ userId, email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

const verifyJwt = (token) => {
    return verify(token, process.env.JWT_SECRET);
};

module.exports = {
    createJwt,
    verifyJwt,
};
