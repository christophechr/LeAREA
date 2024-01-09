const Flow = require("../models/flow.model.js");
const User = require("../models/user.model.js");
const actionsConfig = require("../config/actions.config.js");
const triggersConfig = require("../config/triggers.config.js");

const tryFlow = async (flow, trigger) => {
    User.findById(flow.user).then(async (user) => {
        try {
            const isReady = await trigger.function(user, flow.trigger.params);

            if (isReady) {
                const [aServiceId, actionId] = flow.action.id.split(".");

                try {
                    await actionsConfig
                        .find((service) => service.id === aServiceId)
                        .actions.find(
                            (action) => action.id === actionId
                        )
                        .function(user, flow.action.params);
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

            flow.lastExec += 1;
            if (flow.lastExec >= trigger.execEach) {
                flow.lastExec = 0;
                await tryFlow(flow, trigger);
            }
            flow.save();
        });
    });
};

module.exports = {
    flowTask,
};
