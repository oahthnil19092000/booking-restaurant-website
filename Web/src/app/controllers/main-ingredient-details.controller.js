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

const mainIngredientDetailService = new MainIngredientDetailService(models);
const mainIngredientService = new MainIngredientService(models);
class MainIngredientDetailController {
    async create(req, res) {
        try {
            let mainIngredientDetail = {
                food_id: parseInt(req.body.food_id),
                main_ingredient_id: parseInt(req.body.main_ingredient_id),
                quantity: parseInt(req.body.quantity),
                unit: req.body.unit,
            };
            const v = new Validator();
            let validationResponse = v.validate(
                mainIngredientDetail,
                scheme.mainIngredientDetailCreateValidation
            );
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let newMainIngredientDetail = await mainIngredientDetailService.create(
                    mainIngredientDetail
                );
                if (newMainIngredientDetail != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "The main ingredient detail");
                    res.status(200).json(error);
                } else {
                    let error = message.errorFieldIsExisted;
                    error.message = error.message.replace("{1}", "The main ingredient detail");
                    res.status(200).json(error);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async getListWithFoodID(req, res) {
        try {
            var data = [];
            let foodId = {
                id: parseInt(req.params.food_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(foodId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let mainIngredientDetailOfFood = await mainIngredientDetailService.getByFoodId(
                    foodId.id
                );
                if (mainIngredientDetailOfFood != null) {
                    for (let element of mainIngredientDetailOfFood) {
                        let detail = {
                            quantity: element.quantity,
                            unit: element.unit,
                        };
                        await mainIngredientService
                            .getById(element.main_ingredient_id)
                            .then((value) => {
                                detail.name = value.name;
                                data.push(detail);
                            });
                    }
                    res.status(200).json(data);
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace(
                        "{1}",
                        "Main ingredient detail"
                    );
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async update(req, res) {
        try {
            let id = req.params.id ?? -1;
            let mainIngredientDetail = {
                food_id: parseInt(req.body.food_id),
                main_ingredient_id: parseInt(req.body.main_ingredient_id),
                quantity: parseInt(req.body.quantity),
                unit: req.body.unit,
            };
            const v = new Validator();
            let validationResponse = v.validate(
                mainIngredientDetail,
                scheme.mainIngredientDetailCreateValidation
            );
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let isUpdated = await mainIngredientDetailService.update(id, mainIngredientDetail);
                if (!isUpdated) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace(
                        "{1}",
                        "The main ingredient detail"
                    );
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = message.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace(
                        "{1}",
                        "The main ingredient detail"
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
            let mainIngredientDetailId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(mainIngredientDetailId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await mainIngredientDetailService.delete(mainIngredientDetailId.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace(
                        "{1}",
                        "The main ingredient detail"
                    );
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace(
                        "{1}",
                        "The main ingredient detail"
                    );
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new MainIngredientDetailController();
