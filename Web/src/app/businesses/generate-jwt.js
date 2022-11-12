const jwt = require("jsonwebtoken");
module.exports = async (username) => {
    return jwt.sign({ username: username }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
};
