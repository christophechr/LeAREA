const actionsConfig = require("../config/actions.config");

const getActions = (req, res) => {
    res.send(actionsConfig);
};

module.exports = {
    getActions,
};
