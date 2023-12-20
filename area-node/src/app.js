require("dotenv").config();

const mongoose = require("mongoose");
const routes = require("./routes");

const { flowTask } = require("./tasks/flows.task.js");

const fastifyCron = require("fastify-cron");

const fastify = require("fastify")({
    logger: true,
});

// Connect to the database
mongoose
    .connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

fastify.register(routes);

// Allow CORS requests for all routes
fastify.register(require("@fastify/cors"), {
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "*",
});

fastify.register(fastifyCron, {
    jobs: [{ cronTime: "* * * * * *", onTick: flowTask, start: true }],
});

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 8080, host : "10.15.190.199" });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
