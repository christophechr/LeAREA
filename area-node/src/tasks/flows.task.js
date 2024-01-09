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
                    action.function(user, flow.action.params);
                    flow.finished = true;
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
    Flow.find({}).then((flows) => {
        flows.forEach(async (flow) => {
            const [tServiceId, triggerId] = flow.trigger.id.split(".");

            const trigger = triggersConfig
                .find((service) => service.id === tServiceId)
                .triggers.find((trigger) => trigger.id === triggerId);

            const [aServiceId, actionId] = flow.action.id.split(".");

            const action = actionsConfig
                .find((service) => service.id === aServiceId)
                .actions.find((action) => action.id === actionId);

            // Cancels if the action can be executed only one time and it was already executed.
            if (action.loop === false && flow.finished === true) return;

            flow.lastExec += 1;
            if (flow.lastExec >= trigger.execEach) {
                flow.lastExec = 0;
                await tryFlow(flow, trigger, action);
            }
            flow.save();
        });
    });
};

module.exports = {
    flowTask,
};
