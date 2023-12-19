const actionsConfig = require("../config/actions.config");

const getActions = (req, res) => {
    const actions = actionsConfig.map((service) => {
        service.actions = service.actions.map((action) => {
            delete action.function;
            return action;
        });
    });
    res.send(actions);
};

module.exports = {
    getActions,
};
