const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
