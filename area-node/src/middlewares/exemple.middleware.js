const auth = (request, reply, next) => {
    // Do something

    console.log("Middleware");

    if (request.headers && request.headers.authorization) {
        console.log("OK");
        next();
    } else {
        console.log("NOP");
        reply.code(401).send({ error: "Unauthorized" });
    }
};

module.exports = {
    auth,
};
