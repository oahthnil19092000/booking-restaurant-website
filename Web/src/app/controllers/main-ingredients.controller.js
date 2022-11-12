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

const mainIngredientService = new MainIngredientService(models);
class MainIngredientController {
    async create(req, res) {
        try {
            let mainIngredient = {
                name: req.body.name,
                status: true,
            };
            const v = new Validator();
            let validationResponse = v.validate(
                mainIngredient,
                scheme.mainIngredientCreateValidation
            );
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let newMainIngredient = await mainIngredientService.create(mainIngredient);
                if (newMainIngredient != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "Main ingredient");
                    res.status(200).json(error);
                } else {
                    let error = message.errorFieldIsExisted;
                    error.message = error.message.replace("{1}", "Main ingredient");
                    res.status(200).json(error);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getById(req, res) {
        try {
            let id = req.params.id ?? -1;
            let mainIngredientId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(mainIngredientId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let mainIngredientInfo = await mainIngredientService.getById(mainIngredientId.id);
                if (mainIngredientInfo != null) {
                    res.status(200).json(mainIngredientInfo);
                } else {
                    let error = message.errorNotFound;
                    error.message = error.message.replace("{1}", "Food");
                    res.status(400).json(message.errorNotFound);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async getList(req, res) {
        try {
            let params = req.query;
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
                let mainIngredientList = await mainIngredientService.getList(pagination, order, search_name);
                if (mainIngredientList != null) {
                    res.status(200).json(mainIngredientList);
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async getAll(req, res) {
        try {
            let mainIngredientList = await mainIngredientService.getAll();
            if (mainIngredientList != null) {
                res.status(200).json(mainIngredientList);
            } else {
                res.status(500).json(message.APIErrorServer);
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async update(req, res) {
        try {
            let id = req.params.id ?? -1;
            let mainIngredient = {
                name: req.body.name,
            };
            const v = new Validator();
            let validationResponse = v.validate(
                mainIngredient,
                scheme.mainIngredientCreateValidation
            );
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let isUpdated = await mainIngredientService.update(id, mainIngredient);
                if (!isUpdated) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Main ingredient");
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = message.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace(
                        "{1}",
                        "Main ingredient"
                    );
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
            let mainIngredient = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(mainIngredient, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await mainIngredientService.delete(mainIngredient.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Main ingredient");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace(
                        "{1}",
                        "Main ingredient"
                    );
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new MainIngredientController();
