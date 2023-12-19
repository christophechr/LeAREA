const Flow = require("../models/flow.model.js");
const mongoose = require("mongoose");
const actionsConfig = require("../config/actions.config.js");
const triggersConfig = require("../config/triggers.config.js");

const flowTask = async () => {
    Flow.find({}).then((flows) => {
        flows.forEach((flow) => {
            const [service, action] = flow.trigger.id.split(".");

            console.log(service, action);
        });
    });
};

module.exports = {
    flowTask,
};
