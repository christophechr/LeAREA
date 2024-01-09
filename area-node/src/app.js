require("dotenv").config();

const path = require('node:path');

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

// Set the public folder as static folder for images
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
})

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
        await fastify.listen({ port: 8080, host: '0.0.0.0'});
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};


const { PubSub } = require('@google-cloud/pubsub');

const projectId = process.env.GOOGLE_PROJECT_ID;
const subscriptionName = process.env.GOOGLE_SUB_NAME;

const pubsub = new PubSub({ projectId });

const subscription = pubsub.subscription(subscriptionName);

function handleMessage(message) {
    try {
        const data = JSON.parse(Buffer.from(message.data, 'base64').toString());

        // Extract relevant information from the message payload
        console.log('Received message:', data);

    } catch (e) {
        console.error(e);
    }

    // Acknowledge the message to remove it from the subscription
    message.ack();
}

// Listen for new messages
subscription.on('message', handleMessage);



start();
