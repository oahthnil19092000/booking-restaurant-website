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

const ticketService = new TicketService(models);
const orderService = new OrderService(models);
class TicketController {
    async create(req, res) {
        try {
            let ticket = {
                customer_id: parseInt(req.body.customer_id),
                type_party_id: parseInt(req.body.type_party_id),
                table_id: parseInt(req.body.table_id),
                received_date: new Date(req.body.received_date),
                customer_phone: req.body.customer_phone,
                customer_address: req.body.customer_address,
            };
            const v = new Validator();
            let validationResponse = v.validate(ticket, scheme.ticketCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let newTicket = await ticketService.create(ticket);
                if (newTicket != null) {
                    let error = message.createSuccessful;
                    error.message = error.message.replace("{1}", "Ticket");
                    res.status(200).json(error);
                } else {
                    let error = message.errorFieldIsExisted;
                    error.message = error.message.replace("{1}", "Ticket");
                    res.status(200).json(error);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getById(req, res) {
        try {
            let ticketId = {
                id: parseInt(req.params.id),
            };
            const v = new Validator();
            let validationResponse = v.validate(ticketId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticket = await ticketService.getById(ticketId.id);
                if (ticket != null) {
                    res.status(200).json(ticket);
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Ticket");
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getPendingOrderTicketOfCustomer(req, res) {
        try {
            let customerId = {
                id: parseInt(req.params.customer_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(customerId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticket = await ticketService.getPendingOrderTicketOfCustomer(customerId.id);
                res.status(200).json(ticket);
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getPendingReserveTicketOfCustomer(req, res) {
        try {
            let customerId = {
                id: parseInt(req.params.customer_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(customerId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticket = await ticketService.getPendingReserveTicketOfCustomer(customerId.id);
                res.status(200).json(ticket);
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getListOrderdOfCustomer(req, res) {
        try {
            let customerId = {
                id: parseInt(req.params.customer_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(customerId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticket = await ticketService.getListOrderWithCustomerID(customerId.id);
                if (ticket != null) {
                    res.status(200).json(ticket);
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Ticket");
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getListReservedOfCustomer(req, res) {
        try {
            let customerId = {
                id: parseInt(req.params.customer_id),
            };
            const v = new Validator();
            let validationResponse = v.validate(customerId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let ticket = await ticketService.getListReservedWithCustomerID(customerId.id);
                if (ticket != null) {
                    res.status(200).json(ticket);
                } else {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Ticket");
                    res.status(200).json(errorNotFound);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getListOrder(req, res) {
        try {
            let params = req.query;

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
                let ticketList = await ticketService.getListOrder(pagination, order);
                if (ticketList != null) {
                    res.status(200).json(ticketList);
                } else {
                    res.status(500).json(message.APIErrorServer);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }

    async getListReserveTable(req, res) {
        try {
            let params = req.query;
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
                let ticketList = await ticketService.getListReserveTable(pagination, order);
                if (ticketList != null) {
                    res.status(200).json(ticketList);
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
            let ticket = {
                customer_id: parseInt(req.body.customer_id),
                type_party_id: parseInt(req.body.type_party_id),
                table_id: parseInt(req.body.table_id),
                received_date: new Date(req.body.received_date),
                payment_date:
                    req.body.payment_date != null ? new Date(req.body.payment_date) : null,
                customer_phone: req.body.customer_phone,
                customer_address: req.body.customer_address,
            };
            const v = new Validator();
            let validationResponse = v.validate(ticket, scheme.ticketCreateValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorFieldIsNull);
            } else {
                let isUpdated = await ticketService.update(id, ticket);
                if (!isUpdated) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Ticket");
                    res.status(200).json(errorNotFound);
                } else {
                    let updateSuccessful = message.updateSuccessful;
                    updateSuccessful.message = updateSuccessful.message.replace("{1}", "Ticket");
                    res.status(200).json(updateSuccessful);
                }
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async updatePaymentDate(req, res) {
        try {
            let id = req.params.id ?? -1;
            let ticket = {
                payment_date: new Date(),
            };
            let isUpdated = await ticketService.update(id, ticket);
            if (!isUpdated) {
                let errorNotFound = message.errorNotFound;
                errorNotFound.message = errorNotFound.message.replace("{1}", "Ticket");
                res.status(200).json(errorNotFound);
            } else {
                let updateSuccessful = message.updateSuccessful;
                updateSuccessful.message = updateSuccessful.message.replace("{1}", "Ticket");
                res.status(200).json(updateSuccessful);
            }
        } catch (err) {
            res.status(500).json(message.APIErrorServer);
        }
    }
    async delete(req, res) {
        try {
            let id = req.params.id ?? -1;
            let ticketId = {
                id: parseInt(id),
            };
            const v = new Validator();
            let validationResponse = v.validate(ticketId, scheme.idValidation);
            if (validationResponse !== true) {
                res.status(400).json(message.errorIdFieldIsNull);
            } else {
                let isDeleted =
                    (await ticketService.delete(ticketId.id)) &&
                    (await orderService.deleteWithTicketId(ticketId.id));
                if (!isDeleted) {
                    let errorNotFound = message.errorNotFound;
                    errorNotFound.message = errorNotFound.message.replace("{1}", "Ticket");
                    res.status(200).json(errorNotFound);
                } else {
                    let deleteSuccessful = message.deleteSuccessful;
                    deleteSuccessful.message = deleteSuccessful.message.replace("{1}", "Ticket");
                    res.status(200).json(deleteSuccessful);
                }
            }
        } catch (error) {
            res.status(500).json(message.APIErrorServer);
        }
    }
}
module.exports = new TicketController();
