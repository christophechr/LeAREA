const triggersConfig = require("../config/triggers.config");

const getTriggers = (req, res) => {
    // Remove function from triggers config
    const triggers = triggersConfig.map((service) => {
        service.triggers = service.triggers.map((trigger) => {
            delete trigger.function;
            return trigger;
        });
    });
    res.send(triggers);
};

module.exports = {
    getTriggers,
};
