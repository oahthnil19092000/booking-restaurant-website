const Validator = require("fastest-validator");
const scheme = require("../businesses/validation-handler");
const models = require("../../../models");
module.exports = (req, res, next) => {
    try {
        const user = {
            refreshToken: req.headers.authorization,
        };
        const v = new Validator();
        let validationResponse = v.validate(pagination, scheme.pageValidation);
        if (validationResponse !== true) {
            res.status(401).json(message.authError);
        } else {
            models.Users.findOne({
                where: {
                    refreshToken: user.refreshToken,
                },
            })
                .then((result) => {
                    if (result != null) {
                        if (result.is_admin == true) {
                            next();
                        } else {
                            res.status(401).json(message.authError);
                        }
                    } else {
                        res.status(401).json(message.authError);
                    }
                })
                .catch((error) => {
                    res.status(401).json(message.authError);
                });
        }
    } catch (error) {
        res.status(401).json(message.authError);
    }
};
