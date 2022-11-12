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

const orderService = new OrderService(models);
class OrderController {
    async create(req, res) {
        try {
            let order = {
                ticket_id: parseInt(req.body.ticket_id),
                food_id: parseInt(req.body.food_id),
                quantity: parseInt(req.body.quantity),
            };
            const v = new Validator();
            let validationResponse = v.validate(order, scheme.orderCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let newOrder = await orderService.create(order);
                if (newOrder != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "The order");
                    res.status(200).json(error);
                } else {
                    let error = message.errorFieldIsExisted;
                    error.message = error.message.replace("{1}", "The order");
                    res.status(200).json(error);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getListWithTicketID(req, res) {
        try {
            let orderId = {
                ticket_id: parseInt(req.params.ticket_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(orderId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let orderList = await orderService.getListWithTicketID(orderId.ticket_id);
                if (orderList != null) {
                    res.status(200).json(orderList);
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async getDetail(req, res) {
        try {
            let detailOrder = {
                ticket_id: req.query.ticket_id != null ? parseInt(req.query.ticket_id) : -1,
                food_id: req.query.food_id != null ? parseInt(req.query.food_id) : -1,
            };

            let order = await orderService.getByTicketIDAndFoodID(detailOrder);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async update(req, res) {
        try {
            let id = req.params.id ?? -1;
            let order = {
                ticket_id: parseInt(req.body.ticket_id),
                food_id: parseInt(req.body.food_id),
                quantity: parseInt(req.body.quantity),
            };
            const v = new Validator();
            let validationResponse = v.validate(order, scheme.orderCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let isUpdated = await orderService.update(id, order);
                if (!isUpdated) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "The order");
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = message.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace("{1}", "The order");
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
            let orderId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(orderId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await orderService.delete(orderId.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "The order");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "The order");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new OrderController();
