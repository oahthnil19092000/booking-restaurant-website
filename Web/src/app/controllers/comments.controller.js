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

const commentService = new CommentService(models);
class CommentController {
    async create(req, res) {
        try {
            let comment = {
                bill_id: parseInt(req.body.bill_id),
                content: req.body.content,
                point: parseInt(req.body.point),
            };
            const v = new Validator();
            let validationResponse = v.validate(comment, scheme.commentCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let newComment = await commentService.create(comment);
                if (newComment != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "Comment");
                    res.status(200).json(error);
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getByBillId(req, res) {
        try {
            let bill_id = req.params.bill_id ?? -1;
            let commentWithBillId = {
                bill_id: parseInt(bill_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(commentWithBillId, scheme.billIdValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let comment = await commentService.getByBillId(commentWithBillId.bill_id);
                if (comment != null) {
                    res.status(200).json(comment);
                } else {
                    let error = message.errorNotFound;
                    error.message = error.message.replace("{1}", "Comment");
                    res.status(200).json(message.errorNotFound);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async update(req, res) {
        try {
            let id = req.params.id ?? -1;
            let comment = {
                bill_id: parseInt(req.body.bill_id),
                content: req.body.content,
                point: parseInt(req.body.point),
            };
            const v = new Validator();
            let validationResponse = v.validate(comment, scheme.commentCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let isUpdated = await commentService.update(id, comment);
                if (!isUpdated) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Comment");
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = message.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace("{1}", "Comment");
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
            let commnetId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(commnetId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await commentService.delete(commnetId.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Comment");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "Comment");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new CommentController();
