const mongoose = require("mongoose");

const flowSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    trigger: { type: Object, required: true },
    action: { type: Object, required: true },
    enabled: { type: Boolean, default: true },
});

const Flow = mongoose.model("flow", flowSchema);

module.exports = Flow;
