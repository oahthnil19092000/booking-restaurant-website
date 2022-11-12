const Validator = require("fastest-validator");
const models = require("../../../models");
module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return response.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return response.status(400).send("Invalid Token");
    }
};
