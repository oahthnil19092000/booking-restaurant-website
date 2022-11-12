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

const discountService = new DiscountService(models);
class DiscountController {
    async create(req, res) {
        try {
            let discount = {
                name: req.body.name,
                amount: parseInt(req.body.amount),
                percent: parseInt(req.body.percent),
            };
            const v = new Validator();
            let validationResponse = v.validate(discount, scheme.discountCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let newDiscount = await discountService.create(discount);
                if (newDiscount != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "Discount");
                    res.status(200).json(error);
                } else {
                    let error = message.errorFieldIsExisted;
                    error.message = error.message.replace("{1}", "Discount");
                    res.status(200).json(error);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getById(req, res) {
        try {
            let discountId = {
                id: parseInt(req.params.id),
            };
            const v = new Validator();
            let validationResponse = v.validate(discountId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticket = await discountService.getById(discountId.id);
                if (ticket != null) {
                    res.status(200).json(ticket);
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Discount");
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getList(req, res) {
        try {
            let params = req.body;
            let search_name = params.search;
            if (search_name != null && search_name != "") {
                delete params.page;
                delete params.field;
                delete params.is_reverse_sort;
            }
            let pagination = {
                page: parseInt(params.page) || 1,
                size: parseInt(params.size) || 10,
                field: params.field || "id",
                is_reverse_sort:
                    (params.is_reverse_sort == "true"
                        ? true
                        : params.is_reverse_sort == "false"
                        ? false
                        : null) || false,
            };
            let sorting = pagination.is_reverse_sort ? "DESC" : "ASC";
            let order = null;
            if (pagination.field != null) {
                if (pagination.is_reverse_sort != null) {
                    order = [pagination.field, sorting];
                } else {
                    order = [pagination.field];
                }
            }

            const v = new Validator();
            let validationResponse = v.validate(pagination, scheme.pageValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let discountList = await discountService.getList(pagination, order, search_name);
                if (discountList != null) {
                    res.status(200).json(discountList);
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async update(req, res) {
        try {
            let id = req.params.id ?? -1;
            let discount = {
                name: req.body.name,
                amount: parseInt(req.body.amount),
                percent: parseInt(req.body.percent),
            };
            const v = new Validator();
            let validationResponse = v.validate(discount, scheme.discountCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let isUpdated = await discountService.update(id, discount);
                if (!isUpdated) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Discount");
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = message.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace("{1}", "Discount");
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
            let discountId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(discountId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await discountService.delete(discountId.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Discount");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "Discount");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new DiscountController();
