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
    const countParams = (params) => {
        let count = 0;
        for (const [key, value] of Object.entries(params)) {
            count++;
        }
        return count;
    };

    const count = countParams(params);

    if (count > config.length)
        return res.status(400).send({
            message: `Invalid number of parameters. Expected: ${config.length}, received: ${count}`,
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
                message: "Invalid trigger id, expected: app_name.trigger_name",
            });

        const triggerService = triggerConfig.find(
            (service) => service.id === splittedTriggerId[0]
        );

        if (!triggerService)
            return res.status(400).send({
                message: "Invalid trigger id. Service not found.",
            });

        const triggerConfigObj = triggerService.triggers.find(
            (trigger) => trigger.id === splittedTriggerId[1]
        );

        if (!triggerConfigObj)
            return res.status(400).send({
                message: "Invalid trigger id. Trigger not found.",
            });

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
                message: "Invalid action id. Expected: app_name.action_name",
            });

        const actionService = actionConfig.find(
            (service) => service.id === splittedActionId[0]
        );

        if (!actionService)
            return res.status(400).send({
                message: "Invalid action id. Service not found.",
            });

        const actionConfigObj = actionService.actions.find(
            (action) => action.id === splittedActionId[1]
        );

        if (!actionConfigObj)
            return res.status(400).send({
                message: "Invalid action id. Action not found.",
            });

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

        res.code(201).send({
            message: "Flow created successfully.",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating flow.",
        });
    }
};

const deleteFlow = async (req, res) => {
    try {
        const flow = await Flow.findById(req.params.id);

        if (!flow)
            return res.status(404).send({
                message: "Flow not found.",
            });

        if (flow.user.toString() !== req.user._id.toString())
            return res.status(403).send({
                message: "You are not authorized to delete this flow.",
            });

        await Flow.findByIdAndDelete(req.params.id);

        // Remove the flow from the user's flows array
        req.user.flows = req.user.flows.filter(
            (flowId) => flowId.toString() !== req.params.id.toString()
        );
        await req.user.save();

        res.send({
            message: "Flow deleted successfully.",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting flow.",
        });
    }
}

const updateFlow = async (req, res) => {
    try {
        const flow = await Flow.findById(req.params.id);

        if (!flow)
            return res.status(404).send({
                message: "Flow not found.",
            });

        if (flow.user.toString() !== req.user._id.toString())
            return res.status(403).send({
                message: "You are not authorized to update this flow.",
            });

        if (req.body.name) flow.name = req.body.name;
        if (req.body.trigger) flow.trigger = req.body.trigger;
        if (req.body.action) flow.action = req.body.action;
        if (req.body.enabled) flow.enabled = req.body.enabled;

        await flow.save();

        res.send({
            message: "Flow updated successfully.",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while updating flow.",
        });
    }
}

module.exports = {
    getUserFlows,
    createFlow,
    deleteFlow,
};
