const Validator = require("fastest-validator");
const models = require("../../../models");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) return res.status(401).send("Access Denied");

    try {
        let verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
};