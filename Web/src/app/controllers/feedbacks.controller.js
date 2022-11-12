const models = require("../../../models");
const message = require("../businesses/message-handler");
const Validator = require("fastest-validator");
const scheme = require("../businesses/validation-handler");
const {
    UserService,
    TypeOfPartyService,
    TicketService,
    TableService,
    OrderService,
    MainIngredientDetailService,
    MainIngredientService,
    FoodService,
    FeedbackService,
    DiscountService,
    CommentService,
    BillService,
} = require("../services/index.service");

const feedbackService = new FeedbackService(models);
class FeedbackController {
    async create(req, res) {
        try {
            let feedback = {
                comment_id: parseInt(req.body.comment_id),
                admin_id: parseInt(req.body.admin_id),
                content: req.body.content,
            };
            const v = new Validator();
            let validationResponse = v.validate(feedback, scheme.feedbackCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let newFeedback = await feedbackService.create(feedback);
                if (newFeedback != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "Feedback");
                    res.status(200).json(error);
                } else {
                    let error = message.errorFieldIsExisted;
                    error.message = error.message.replace("{1}", "Feedback");
                    res.status(200).json(error);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getByCommentId(req, res) {
        try {
            let comment_id = req.params.comment_id ?? -1;
            let feedbackWithCommentId = {
                comment_id: parseInt(comment_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(feedbackWithCommentId, scheme.feedbackIdValidation);
            if (validationResponse !== true) {
                res.status(200).json(message.errorIdFieldIsNull);
            } else {
                let feedback = await feedbackService.getByCommentId(
                    feedbackWithCommentId.comment_id
                );
                if (feedback != null) {
                    res.status(200).json(feedback);
                } else {
                    let error = message.errorNotFound;
                    error.message = error.message.replace("{1}", "Feedback");
                    res.status(200).json(message.errorNotFound);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getByAdminId(req, res) {
        try {
            let admin_id = req.params.admin_id ?? -1;
            let feedbackWithAdminId = {
                admin_id: parseInt(admin_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(feedbackWithAdminId, scheme.adminIdValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let feedback = await feedbackService.getByAdminId(feedbackWithAdminId.admin_id);
                if (feedback != null) {
                    res.status(200).json(feedback);
                } else {
                    let error = message.errorNotFound;
                    error.message = error.message.replace("{1}", "Feedback");
                    res.status(400).json(message.errorNotFound);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async update(req, res) {
        try {
            let id = req.params.id ?? -1;
            let feedback = {
                comment_id: parseInt(req.body.comment_id),
                admin_id: parseInt(req.body.admin_id),
                content: req.body.content,
            };
            const v = new Validator();
            let validationResponse = v.validate(feedback, scheme.feedbackCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let isUpdated = await feedbackService.update(id, feedback);
                if (!isUpdated) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Feedback");
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = message.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace("{1}", "Feedback");
                    res.status(200).json(updateSuccessful);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id ?? -1;
            let feedbackId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(feedbackId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await feedbackService.delete(feedbackId.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Feedback");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "Feedback");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new FeedbackController();
