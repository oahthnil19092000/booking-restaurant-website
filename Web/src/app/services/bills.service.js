const { QueryTypes } = require("Sequelize");
const { sequelize } = require("../../../models");

class BillService {
    constructor(models) {
        this.model = models.Bills;
    }

    async create(data) {
        try {
            let [bill, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return bill;
            } else {
                return bill;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        let status = true;
        try {
            let bill = await this.model.findOne({ where: { id: id, status: status } });
            return bill;
        } catch (err) {
            return null;
        }
    }
    async getByTicketId(ticket_id) {
        try {
            let bill = await this.model.findOne({
                where: { ticket_id: ticket_id },
            });
            return bill;
        } catch (err) {
            return null;
        }
    }

    async getByAdminId(admin_id) {
        try {
            let bill = await this.model.findOne({ where: { admin_id: admin_id } });
            return bill;
        } catch (err) {
            return null;
        }
    }

    async getByDiscountId(discount_id) {
        try {
            let bill = await this.model.findOne({ where: { discount_id: discount_id } });
            return bill;
        } catch (err) {
            return null;
        }
    }

    async update(id, data) {
        let status = true;
        try {
            let isUpdated = await this.model.update(data, {
                where: { id: id, status: status },
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

    async getTotolRevenueInCurrentMonth() {
        var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth();
        var startDate = new Date(y, m, 1);
        var endDate = new Date(y, m + 1, 0);
        try {
            let revenue = await sequelize.query(
                "SELECT sum(sum_total) total_revenue FROM bills WHERE updatedAt Between :startDate And :endDate And status = 1",
                {
                    replacements: { startDate: startDate, endDate: endDate },
                    type: QueryTypes.SELECT,
                }
            );
            return revenue != null ? revenue[0].total_revenue : null;
        } catch (err) {
            return null;
        }
    }

    async getTotolRevenueOfOrderInCurrentMonth() {
        var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth();
        var startDate = new Date(y, m, 1);
        var endDate = new Date(y, m + 1, 0);
        try {
            let revenue = await sequelize.query(
                "SELECT sum(sum_total) total_revenue FROM bills b join tickets t on (b.ticket_id = t.id) WHERE b.updatedAt Between :startDate And :endDate And b.status = 1 and t.table_id = 0",
                {
                    replacements: { startDate: startDate, endDate: endDate },
                    type: QueryTypes.SELECT,
                }
            );
            return revenue != null ? revenue[0].total_revenue : null;
        } catch (err) {
            return null;
        }
    }

    async getTotolRevenueOfReserveTableInCurrentMonth() {
        var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth();
        var startDate = new Date(y, m, 1);
        var endDate = new Date(y, m + 1, 0);
        try {
            let revenue = await sequelize.query(
                "SELECT sum(sum_total) total_revenue FROM bills b join tickets t on (b.ticket_id = t.id) WHERE b.updatedAt Between :startDate And :endDate And b.status = 1 and t.table_id > 1",
                {
                    replacements: { startDate: startDate, endDate: endDate },
                    type: QueryTypes.SELECT,
                }
            );
            return revenue != null ? revenue[0].total_revenue : null;
        } catch (err) {
            return null;
        }
    }

    async getTotolRevenueAtMonth(m) {
        var date = new Date(),
            y = date.getFullYear();
        var startDate = new Date(y, m, 1);
        var endDate = new Date(y, m + 1, 0);
        try {
            let revenue = await sequelize.query(
                "SELECT sum(sum_total) total_revenue FROM bills WHERE updatedAt Between :startDate And :endDate And status = 1",
                {
                    replacements: { startDate: startDate, endDate: endDate },
                    type: QueryTypes.SELECT,
                }
            );
            return revenue != null ? revenue[0].total_revenue : null;
        } catch (err) {
            return null;
        }
    }

    async getTheBestSellingProductInCurrentMonth() {
        var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth();
        var startDate = new Date(y, m, 1);
        var endDate = new Date(y, m + 1, 0);
        try {
            let theBestSellingProduct = await sequelize.query(
                "select * from foods f join (SELECT food_id, sum(quantity) count FROM bills b join orders o on ( b.ticket_id =o.ticket_id) where b.updatedAt BETWEEN :startDate and :endDate and b.status = 1 GROUP by food_id) c on (f.id = c.food_id) HAVING c.count = max(c.count);",
                {
                    replacements: { startDate: startDate, endDate: endDate },
                    type: QueryTypes.SELECT,
                }
            );
            return theBestSellingProduct != null ? theBestSellingProduct[0] : null;
        } catch (err) {
            return null;
        }
    }

    async getTheMostBookedTableTypeInCurrentMonth() {
        var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth();
        var startDate = new Date(y, m, 1);
        var endDate = new Date(y, m + 1, 0);
        try {
            let theMostBookedTableType = await sequelize.query(
                "select * from tables t join (SELECT t.table_id , count(*) count FROM bills b join tickets t on (b.ticket_id = t.id) where b.updatedAt BETWEEN :startDate and :endDate and b.status = 1 and t.table_id != 0 GROUP BY t.table_id ) b on (t.id = b.table_id ) HAVING count = max(count)",
                {
                    replacements: { startDate: startDate, endDate: endDate },
                    type: QueryTypes.SELECT,
                }
            );
            return theMostBookedTableType != null ? theMostBookedTableType[0] : null;
        } catch (err) {
            return null;
        }
    }

    async delete(id) {
        let status = false;
        try {
            let isRemoved = await this.model.update(
                { status: status },
                { where: { id: id, status: true } }
            );
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

module.exports = BillService;
