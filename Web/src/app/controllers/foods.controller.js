const models = require("../../../models");
const message = require("../businesses/message-handler");
const { writeFile } = require("fs");
require("dotenv").config();
const path = require("path");
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
const messageHandler = require("../businesses/message-handler");

const foodService = new FoodService(models);

class FoodController {
    async create(req, res) {
        let image_upload = {
            url: req.body.url,
            file_base64: req.body.file_base64,
            is_url: req.body.is_url.toLowerCase() == "true",
        };
        let checkScheme = scheme.imageUploadValidation;
        if (!image_upload.is_url) {
            checkScheme.file_base64 = checkScheme.file_base64 + "|min:1";
        } else {
            checkScheme.url = checkScheme.url + "|min:1";
        }
        const v = new Validator();
        let validationResponse = v.validate(image_upload, checkScheme);
        if (validationResponse !== true) {
            res.status(400).json(message.imageUploadError);
        } else {
            let url = "";
            if (!image_upload.is_url) {
                image_upload.file_base64 = image_upload.file_base64.replace(
                    /^data:image\/(png|gif|jpeg);base64,/,
                    ""
                );
                let image_name = "src/public/src/images/foods/" + req.body.name + ".png";
                writeFile(image_name, image_upload.file_base64, "base64", function (err) {
                    if (err) {
                        res.status(400).json(message.imageUploadError);
                    } else {
                        url = image_name.replace(
                            "src/public",
                            process.env.DEV_BACKEND_URL || "http://localhost/"
                        );
                    }
                });
            }

            let food = {
                name: req.body.name,
                price: parseInt(req.body.price),
                image_url: image_upload.is_url ? image_upload.url : url,
                status: true,
            };
            let validationResponse = v.validate(food, scheme.foodCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                try {
                    let newFood = await foodService.create(food);
                    if (newFood != null) {
                        res.status(200).json(newFood);
                    } else {
                        let error_message = message.errorNotFound;
                        error_message.message.replace("{1}", "Food");
                        res.status(200).json(error_message);
                    }
                } catch (err) {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        }
    }

    async getFoodWithMainIngredientId(req, res) {
        try {
            let main_ingredient_id = req.params.main_ingredient_id;
            let foodList = await foodService.getFoodWithMainIngredientId(main_ingredient_id);
            if (foodList != null && foodList.length > 0) {
                res.status(200).json(foodList);
            } else {
                let error = message.errorNotFound;
                error.message = error.message.replace("{1}", "Food");
                res.status(400).json(message.errorNotFound);
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getTheMostExpensiveFood(req, res) {
        try {
            let food = await foodService.getTheMostExpensiveFood();
            if (food != null) {
                res.status(200).json(food);
            } else {
                let error = message.errorNotFound;
                error.message = error.message.replace("{1}", "Food");
                res.status(400).json(message.errorNotFound);
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getTheLeastExpensiveFood(req, res) {
        try {
            let food = await foodService.getTheLeastExpensiveFood();
            if (food != null) {
                res.status(200).json(food);
            } else {
                let error = message.errorNotFound;
                error.message = error.message.replace("{1}", "Food");
                res.status(400).json(message.errorNotFound);
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getTheMostDeliciousFood(req, res) {
        try {
            let food = await foodService.getTheMostDeliciousFood();
            if (food != null) {
                res.status(200).json(food);
            } else {
                let error = message.errorNotFound;
                error.message = error.message.replace("{1}", "Food");
                res.status(400).json(message.errorNotFound);
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getTheLeastDeliciousFood(req, res) {
        try {
            let food = await foodService.getTheLeastDeliciousFood();
            if (food != null) {
                res.status(200).json(food);
            } else {
                let error = message.errorNotFound;
                error.message = error.message.replace("{1}", "Food");
                res.status(400).json(message.errorNotFound);
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
                let foodList = await foodService.getList(pagination, order, search_name);
                if (foodList != null) {
                    res.status(200).json(foodList);
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getIdPriceWithFood(req, res) {
        let search_name = req.body.search;
        let order = null;
        let pagination = {
            page: 1,
            size: 1,
        };
        let food = await foodService.getList(pagination, order, search_name);
        if (food != null) {
            res.status(200).json(food.rows[0]);
        } else {
            res.status(200).json(-1);
        }
    }

    async detail(req, res) {
        try {
            let id = req.params.id ?? -1;
            let foodId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(foodId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let foodInfo = await foodService.getById(foodId.id);
                if (foodInfo != null) {
                    res.status(200).json(foodInfo);
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

    async update(req, res) {
        let image_upload = {
            url: req.body.url,
            file_base64: req.body.file_base64,
            is_url: req.body.is_url.toLowerCase() == "true",
        };
        let checkScheme = scheme.imageUploadValidation;
        if (!image_upload.is_url) {
            checkScheme.file_base64 = checkScheme.file_base64 + "|min:1";
        } else {
            checkScheme.url = checkScheme.url + "|min:1";
        }
        const v = new Validator();
        let validationResponse = v.validate(image_upload, checkScheme);
        if (validationResponse !== true) {
            res.status(400).json(message.imageUploadError);
        } else {
            let url = "";
            if (!image_upload.is_url) {
                image_upload.file_base64 = image_upload.file_base64.replace(
                    /^data:image\/(png|gif|jpeg);base64,/,
                    ""
                );
                let image_name = "src/public/src/images/foods/" + req.body.name + ".png";
                writeFile(image_name, image_upload.file_base64, "base64", function (err) {
                    if (err) {
                        res.status(400).json(message.imageUploadError);
                    } else {
                        url = image_name.replace(
                            "src/public",
                            process.env.DEV_BACKEND_URL || "http://localhost"
                        );
                    }
                });
            }

            let food = {
                id: parseInt(req.params.id),
                name: req.body.name,
                price: parseInt(req.body.price),
                image_url: image_upload.is_url ? image_upload.url : url,
                status: true,
            };
            let validationResponse = v.validate(food, scheme.foodUpdateValidation);
            if (validationResponse !== true) {
                res.status(400).json(messageHandler.errorFieldIsNull);
            } else {
                try {
                    let id = food.id;
                    delete food.id;
                    let isUpdated = await foodService.update(id, food);
                    if (!isUpdated) {
                        let errorNotFound = message.errorNotFound;
                        errorNotFound.message = errorNotFound.message.replace("{1}", "The order");
                        res.status(200).json(errorNotFound);
                    } else {
                        let updateSuccessful = message.updateSuccessful;
                        updateSuccessful.message = updateSuccessful.message.replace(
                            "{1}",
                            "The order"
                        );
                        res.status(200).json(updateSuccessful);
                    }
                } catch (err) {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id ?? -1;
            let foodId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(foodId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted = await foodService.delete(foodId.id);
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Food");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "Food");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new FoodController();
