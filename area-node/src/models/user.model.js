const mongoose = require("mongoose");

const toLower = (v) => {
    return v.toLowerCase();
};

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, set: toLower },
    passwordHash: { type: String, required: true },
    githubToken: { type: String },
    googleToken: { type: Object },
    googleEmail: { type: String },
    SpotifyToken : {type : String },

    githubRepoCount: { type: Number, default: -1 },
    githubFollowersCount: { type: Number, default: -1 },

    // Array of flow IDs that belong to the user
    flows: [{ type: mongoose.Schema.Types.ObjectId, ref: "flow" }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
