const Flow = require("../models/flow.model.js");
const User = require("../models/user.model.js");
const actionsConfig = require("../config/actions.config.js");
const triggersConfig = require("../config/triggers.config.js");

const flowTask = async () => {
    Flow.find({}).then((flows) => {
        flows.forEach((flow) => {
            const [tServiceId, triggerId] = flow.trigger.id.split(".");

            User.findById(flow.user).then(async (user) => {
                try {
                    const isReady = await triggersConfig
                        .find((service) => service.id === tServiceId)
                        .triggers.find((trigger) => trigger.id === triggerId)
                        .function(user, flow.trigger.params);

                    if (isReady) {
                        const [aServiceId, actionId] =
                            flow.action.id.split(".");

                        try {
                            actionsConfig
                                .find((service) => service.id === aServiceId)
                                .actions.find(
                                    (action) => action.id === actionId
                                )
                                .function(user, flow.action.params);
                            console.log("Flow executed");
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        });
    });
};

module.exports = {
    flowTask,
};
