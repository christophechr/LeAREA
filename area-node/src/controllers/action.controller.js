const actionsConfig = require("../config/actions.config");

const getActions = (req, res) => {
    // Remove function from actions config
    const actions = actionsConfig.map((action) => {
        const { function: func, ...rest } = action;
        return rest;
    });
    res.send(actions);
};

module.exports = {
    getActions,
};
