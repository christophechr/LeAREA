const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createJwt } = require("../utils/jwt.utils");
const { createWallet } = require("../actions/micpmt.action")

const register = async (request, reply) => {
    const { email, password } = request.body;

    if (!email || !password) {
        reply.status(400).send("Missing email or password");
    }

    await bcrypt
        .hash(password, 10)
        .then(async (hash) => {
            const user = new User({ email, passwordHash: hash });

            await createWallet(user);

            await user
                .save()
                .then((savedUser) => {
                    const token = createJwt(savedUser._id, savedUser.email);

                    reply.send({
                        id: savedUser._id,
                        token,
                    });
                })
                .catch((err) => {
                    // Duplicate email
                    if (err.code === 11000) {
                        reply.status(409).send({
                            message: "Email already exists",
                            code: err.code,
                        });
                    } else {
                        reply.status(500).send("Internal server error");
                    }
                });
        })
        .catch((err) => {
            console.log(err);
            reply.status(500).send("Internal server error");
        });
};

const login = async (request, reply) => {
    const { email, password } = request.body;
    console.log(email, password);
    if (!email || !password) {
        reply.status(400).send("Missing email or password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        reply.status(401).send({
            message: "Incorrect email or password",
        });
    }

    await bcrypt.compare(password, user.passwordHash).then((match) => {
        if (!match) {
            reply.status(401).send({
                message: "Incorrect email or password",
            });
        } else {
            const token = createJwt(user._id, user.email);

            reply.send({
                id: user._id,
                token,
            });
        }
    });
};

const me = async (request, reply) => {
    reply.send({
        isGithubConnected: !!request.user.githubToken,
        isGoogleConnected: !!request.user.googleToken,
        isSpotifyConnected: !!request.user.SpotifyToken,
    });
};

module.exports = {
    register,
    login,
    me,
};
