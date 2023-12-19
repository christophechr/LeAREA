const Flow = require("../models/flow.model.js");
const triggerConfig = require("../config/triggers.config.js");
const actionConfig = require("../config/actions.config.js");

const getUserFlows = async (req, res) => {
    try {
        const flows = await Flow.find({ user: req.user._id });

        res.send(flows);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving flows.",
        });
    }
};

const checkParams = (params, config, res) => {
    if (params.length !== config.length)
        return res.status(400).send({
            message: `Invalid number of parameters. Expected: ${config.length}, received: ${params.length}`,
        });

    for (const param of config) {
        if (param.required && !params[param.id])
            return res.status(400).send({
                message: `Missing required parameter: ${param.id}`,
            });
        else if (!param.required && !params[param.id]) continue;

        if (param.type === "number" && isNaN(params[param.id]))
            return res.status(400).send({
                message: `Invalid parameter format: ${param.id}`,
            });
        if (param.type === "enum") {
            const values = param.values.map((value) => value.value);
            if (!values.includes(params[param.id]))
                return res.status(400).send({
                    message: `Invalid parameter value: ${
                        param.id
                    }. Valid values: ${values.join(", ")}`,
                });
        }
        if (param.type === "boolean") {
            if (params[param.id] !== true && params[param.id] !== false)
                return res.status(400).send({
                    message: `Invalid parameter value: ${param.id}`,
                });
        }
        if (param.type === "string") {
            if (typeof params[param.id] !== "string")
                return res.status(400).send({
                    message: `Invalid parameter value: ${param.id}`,
                });
        }
    }
    return undefined;
};

const createFlow = async (req, res) => {
    try {
        const { trigger, action, name } = req.body;

        if (!trigger || !action || !name)
            return res.status(400).send({
                message: "Missing required parameters.",
            });

        // Check if the trigger id is valid by existing in the config file (trigger.id = ${app name}.${trigger name})

        const splittedTriggerId = trigger.id.split(".");
        const splittedActionId = action.id.split(".");

        if (splittedTriggerId.length !== 2)
            return res.status(400).send({
                message: "Invalid trigger id.",
            });

        console.log(triggerConfig);
        if (
            !triggerConfig[splittedTriggerId[0]] ||
            !triggerConfig[splittedTriggerId[0]].triggers[splittedTriggerId[1]]
        ) {
            return res.status(400).send({
                message: "Invalid trigger id.",
            });
        }

        const triggerConfigObj =
            triggerConfig[splittedTriggerId[0]].triggers[splittedTriggerId[1]];

        // Check if all the required parameters are provided and are in the correct format
        const triggerError = checkParams(
            trigger.params,
            triggerConfigObj.params,
            res
        );
        if (triggerError) return triggerError;

        // Check if the action id is valid by existing in the config file (action.id = ${app name}.${action name})
        if (splittedActionId.length !== 2)
            return res.status(400).send({
                message: "Invalid action id.",
            });

        if (
            !actionConfig[splittedActionId[0]] ||
            !actionConfig[splittedActionId[0]][splittedActionId[1]]
        ) {
            return res.status(400).send({
                message: "Invalid action id.",
            });
        }

        const actionConfigObj =
            actionConfig[splittedActionId[0]][splittedActionId[1]];

        // Check if all the required parameters are provided and are in the correct format
        const actionError = checkParams(
            action.params,
            actionConfigObj.params,
            res
        );
        if (actionError) return actionError;

        const flow = new Flow({
            user: req.user._id,
            trigger: req.body.trigger,
            action: req.body.action,
            name: req.body.name,
        });

        await flow.save();

        // Add the flow to the user's flows array
        req.user.flows.push(flow._id);
        await req.user.save();

        res.send(flow);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating flow.",
        });
    }
};

module.exports = {
    getUserFlows,
    createFlow,
};
