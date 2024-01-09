const { PubSub } = require('@google-cloud/pubsub');
const { emailReceived } = require('../triggers/gmail.trigger');

const projectId = process.env.GOOGLE_PROJECT_ID;
const subscriptionName = process.env.GOOGLE_SUB_NAME;

const pubsub = new PubSub({ projectId });

const subscription = pubsub.subscription(subscriptionName);

// Listen for new messages
subscription.on('message', emailReceived);
