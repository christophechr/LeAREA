const getRed = (req, res) => {
    // Log in color red
    console.log("\x1b[31m", "This is red");
    return res.status(200).send("This is red");
};

const getGreen = (req, res) => {
    // Log in color green
    console.log("\x1b[32m", "This is green");
    return res.status(200).send("This is green");
}

const getBlue = (req, res) => {
    // Log in color blue
    console.log("\x1b[34m", "This is blue");
    return res.status(200).send("This is blue");
}

module.exports = {
    getRed,
    getGreen,
    getBlue,
};
