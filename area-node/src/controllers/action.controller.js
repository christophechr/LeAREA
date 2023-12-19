const actionsConfig = require("../config/actions.config");

const getActions = (req, res) => {
    // Remove functions from the actions config object
    const actions = {};

    for (const [key, value] of Object.entries(actionsConfig)) {
        actions[key] = {
            name: value.name,
            actions: {},
        };

        for (const [k, v] of Object.entries(actionsConfig[key].actions)) {
            actions[key].actions[k] = {
                name: v.name,
                description: v.description,
                params: v.params,
            };
        }
    }

    return res.status(200).send(actions);
};

module.exports = {
    getActions,
};
