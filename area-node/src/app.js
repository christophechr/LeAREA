require("dotenv").config();

const mongoose = require("mongoose");

const fastify = require("fastify")({
    logger: true,
});

const routes = require("./routes");
console.log(process.env.DB_USER);
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

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 8080 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
