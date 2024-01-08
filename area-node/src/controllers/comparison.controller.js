const Flow = require("../models/flow.model");


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

module.exports = {
    getUserFlows,
}