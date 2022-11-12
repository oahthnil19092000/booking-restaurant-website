const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../../models");
class OrderService {
    constructor(models) {
        this.model = models.Orders;
    }

    async create(data) {
        try {
            let [order, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return order;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let order = await this.model.findOne({ where: { id: id } });
            return order;
        } catch (err) {
            return null;
        }
    }
    async getByTicketIDAndFoodID(orders) {
        try {
            let order = await this.model.findOne({
                where: {
                    food_id: orders.food_id,
                    ticket_id: orders.ticket_id,
                },
            });
            return order;
        } catch (err) {
            return null;
        }
    }

    async getListWithTicketID(ticket_id) {
        try {
            let list = await this.model.findAndCountAll({
                where: {
                    ticket_id: ticket_id,
                },
            });
            return list;
        } catch (err) {
            return null;
        }
    }

    async getSumTotalOfTicket(ticket_id) {
        try {
            let list = await sequelize.query(
                "SELECT SUM(f.price * o.quantity) sum_total FROM Orders o JOIN Foods f ON (f.id = o.food_id) WHERE o.ticket_id = " +
                    ticket_id,
                { type: QueryTypes.SELECT }
            );
            return list;
        } catch (err) {
            return null;
        }
    }

    async update(id, data) {
        try {
            let isUpdated = await this.model.update(data, {
                where: { id: id },
            });
            if (isUpdated) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async deleteWithTicketId(ticket_id) {
        try {
            let isRemoved = await this.model.destroy({ where: { ticket_id: ticket_id } });
            if (isRemoved) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async delete(id) {
        try {
            let isRemoved = await this.model.destroy({ where: { id: id } });
            if (isRemoved) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async clearData() {
        try {
            let isCleared = await this.model.destroy({
                truncate: true,
            });
            if (isCleared) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
}

module.exports = OrderService;
