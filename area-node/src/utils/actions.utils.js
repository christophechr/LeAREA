const actionsConfig = require('../config/actions.config');
const User = require('../models/user.model');

const executeAction = async (flow) => {
    try {
        const [aServiceId, actionId] = flow.action.id.split('.');

        const action = actionsConfig
            .find((service) => service.id === aServiceId)
            .actions.find((action) => action.id === actionId);

        User.findById(flow.user).then((user) => {
            action.function(user, flow.action.params);
        });

        if (action.loop === false) {
            flow.enabled = false;
            await flow.save();
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    executeAction,
}