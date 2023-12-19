const triggersConfig = require("../config/triggers.config");

const getTriggers = (req, res) => {
    res.send(triggersConfig);
};

module.exports = {
    getTriggers,
};
