const Flow = require("../models/flow.model.js");
const User = require("../models/user.model.js");
const actionsConfig = require("../config/actions.config.js");
const triggersConfig = require("../config/triggers.config.js");

const flowTask = async () => {
    Flow.find({}).then((flows) => {
        flows.forEach((flow) => {
            const [service, action] = flow.trigger.id.split(".");

            User.findById(flow.user).then(async (user) => {
                try {
                    const isReady = await triggersConfig
                        .find((trigger) => trigger.id === service)
                        .triggers.find((trigger) => trigger.id === action)
                        .function(user, flow.trigger.params);

                    if (isReady) {
                        const [service, action] = flow.action.id.split(".");

                        try {
                            actionsConfig
                                .find((s) => s.id === service)
                                .actions.find((a) => a.id === action)
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
