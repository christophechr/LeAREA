const actionsConfig = require('../config/actions.config');
const User = require('../models/user.model');

const executeAction = async (flow, user) => {
    try {
        const [aServiceId, actionId] = flow.action.id.split('.');

        const action = actionsConfig
            .find((service) => service.id === aServiceId)
            .actions.find((action) => action.id === actionId);

        if (user)
            action.function(user, flow.action.params);
        else {
            await User.findById(flow.user).then(async (user) => {
                await action.function(user, flow.action.params);
            });
        }

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