const Flow = require("../models/flow.model.js");
const User = require("../models/user.model.js");
const actionsConfig = require("../config/actions.config.js");
const triggersConfig = require("../config/triggers.config.js");

const tryFlow = async (flow, trigger, action) => {
    User.findById(flow.user).then(async (user) => {
        try {
            const isReady = await trigger.function(user, flow.trigger.params);

            if (isReady) {
                try {
                    if (flow.loop === false)
                        flow.enabled = false;
                    await flow.save();
                    await action.function(user, flow.action.params);
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    });
}

const flowTask = async () => {
    Flow.find({
        enabled: true,
    }).then((flows) => {
        flows.forEach(async (flow) => {
            const [tServiceId, triggerId] = flow.trigger.id.split(".");

            const trigger = triggersConfig
                .find((service) => service.id === tServiceId)
                .triggers.find((trigger) => trigger.id === triggerId);

            // Cancels iteration if their is no function to execute.
            // This appends when the trigger is handled by a callback, like the Gmail trigger.
            if (trigger.execEach === 0 || trigger.function === undefined) {
                return;
            }

            const [aServiceId, actionId] = flow.action.id.split(".");

            const action = actionsConfig
                .find((service) => service.id === aServiceId)
                .actions.find((action) => action.id === actionId);

            // Cancels if the action can be executed only one time and it was already executed.
            flow.lastExec += 1;
            if (flow.lastExec === trigger.execEach) {
                flow.lastExec = 0;
                await flow.save();
                await tryFlow(flow, trigger, action);
            }
            await flow.save();
        });
    });
};

module.exports = {
    flowTask,
};
