const aboutConfig = require("../config/about.config");

const getAboutJson = (req, res) => {
    try {
        const current_time = Math.floor(Date.now() / 1000);
        aboutConfig.client.host = req.hostname;
        aboutConfig.server.current_time = current_time;

        return res.status(200).send(aboutConfig);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = {
    getAboutJson,
};