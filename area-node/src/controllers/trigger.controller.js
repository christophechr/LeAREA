const triggersConfig = require("../config/triggers.config");

const getTriggers = (req, res) => {
    // Remove functions from the actions config object
    const triggers = {};

    for (const [key, value] of Object.entries(triggersConfig)) {
        triggers[key] = {
            name: value.name,
            triggers: {},
        };

        for (const [k, v] of Object.entries(triggersConfig[key].triggers)) {
            triggers[key].triggers[k] = {
                name: v.name,
                description: v.description,
                params: v.params,
            };
        }
    }

    return res.status(200).send(triggers);
};

module.exports = {
    getTriggers,
};
