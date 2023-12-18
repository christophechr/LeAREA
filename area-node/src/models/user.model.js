const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    githubToken: { type: String },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
