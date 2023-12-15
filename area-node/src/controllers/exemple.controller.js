const User = require("../models/user.model");

const get = async (request, reply) => {
    const users = await User.find();
    reply.send(users);
};

const post = async (request, reply) => {
    const user = new User(request.body);
    const savedUser = await user.save();
    reply.send(savedUser);
};

module.exports = {
    get,
    post,
};
