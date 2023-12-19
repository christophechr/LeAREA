const Flow = require("../models/flow.model.js");
const User = require("../models/user.model.js");
const actionsConfig = require("../config/actions.config.js");
const triggersConfig = require("../config/triggers.config.js");

const flowTask = async () => {
    Flow.find({}).then((flows) => {
        flows.forEach((flow) => {
            const [service, action] = flow.trigger.id.split(".");

            User.findById(flow.user)
                .populate("githubToken")
                .then(async (user) => {
                    try {
                        const isReady = await triggersConfig[service].triggers[
                            action
                        ].function(user, flow.trigger.params);

                        if (isReady) {
                            const [service, action] = flow.action.id.split(".");

                            try {
                                actionsConfig[service].actions[action].function(
                                    user,
                                    flow.action.params
                                );
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
