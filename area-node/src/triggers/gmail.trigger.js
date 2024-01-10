const Flow = require('../models/flow.model');
const { executeAction } = require('../utils/actions.utils');
const User = require('../models/user.model');

function emailReceived(message) {
    try {
        const data = JSON.parse(Buffer.from(message.data, 'base64').toString());

        // Extract relevant information from the message payload
        console.log('Received message:', data);

        // Find enabled flows with the Gmail trigger and the user that have the same email address as the one that received the email
        Flow.find({
            enabled: true,
            'trigger.id': 'gmail.email_received'
        }).then((flows) => {
            flows.forEach((flow) => {

                User.findById(flow.user).then(async (user) => {
                    console.log("Flow user: ", user);
                    console.log("User email: ", user.googleEmail);

                    console.log("Testing : ", user.googleEmail === data.emailAddress);

                    if (user.googleEmail === data.emailAddress)
                        await executeAction(flow);
                }).catch((err) => {
                    console.log(err);
                });
            });
            console.log("Flows found : ", flows);
        }).catch((err) => {
            console.log(err);
        });

    } catch (e) {
        console.error(e);
    }

    // Acknowledge the message to remove it from the subscription
    message.ack();
}

module.exports = {
    emailReceived,
}
