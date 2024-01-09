function emailReceived(message) {
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

module.exports = {
    emailReceived,
}
