const triggersConfig = require("../config/triggers.config");

const getTriggers = (req, res) => {
    // Remove function from triggers config
    const triggers = triggersConfig.map((trigger) => {
        const { function: func, ...rest } = trigger;
        return rest;
    });
    res.send(triggers);
};

module.exports = {
    getTriggers,
};
