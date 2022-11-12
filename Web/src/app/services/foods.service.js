const { Op } = require("sequelize");
const { QueryTypes } = require("Sequelize");
const { sequelize } = require("../../../models");
class FoodService {
    constructor(models) {
        this.model = models.Foods;
    }

    async create(data) {
        try {
            let [food, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return food;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        let status = true;
        try {
            let food = await this.model.findOne({ where: { id: id, status: status } });
            return food;
        } catch (err) {
            return null;
        }
    }

    async getFoodWithMainIngredientId(mainIngredientId) {
        try {
            let foodList = await sequelize.query(
                "SELECT DISTINCT f.* FROM foods f join mainingredientdetails m on( f.id = m.food_id ) where m.main_ingredient_id = :mainingredient_id and f.status = 1",
                {
                    replacements: { mainingredient_id: mainIngredientId },
                    type: QueryTypes.SELECT,
                }
            );
            return foodList;
        } catch (err) {
            return [];
        }
    }

    async getTheMostExpensiveFood() {
        try {
            let food = await sequelize.query(
                "SELECT * from foods where price = (SELECT max(price) from foods)",
                {
                    type: QueryTypes.SELECT,
                }
            );
            return food != null ? food[0] : null;
        } catch (err) {
            return null;
        }
    }

    async getTheLeastExpensiveFood() {
        try {
            let food = await sequelize.query(
                "SELECT * from foods where price = (SELECT min(price) from foods)",
                {
                    type: QueryTypes.SELECT,
                }
            );
            return food != null ? food[0] : null;
        } catch (err) {
            return null;
        }
    }

    
    async getTheMostDeliciousFood() {
        try {
            let food = await sequelize.query(
                "select f.*, o.quantities from foods f join (select food_id, count(quantity) quantities from orders group by food_id order by quantities desc limit 1) o on (f.id = o.food_id)",
                {
                    type: QueryTypes.SELECT,
                }
            );
            return food != null ? food[0] : null;
        } catch (err) {
            return null;
        }
    }

    async getTheLeastDeliciousFood() {
        try {
            let food = await sequelize.query(
                "select f.*, o.quantities from foods f join (select food_id, count(quantity) quantities from orders group by food_id order by quantities asc limit 1) o on (f.id = o.food_id)",
                {
                    type: QueryTypes.SELECT,
                }
            );
            return food != null ? food[0] : null;
        } catch (err) {
            return null;
        }
    }
  
    async getList(pagination, order, search_name) {
        try {
            let where = null;
            let status = true;
            let iLikeName = [];
            if (search_name != null && search_name != "" && search_name != undefined) {
                let searchList = search_name.split(" ");
                search_name = "%" + searchList.join("% %") + "%";
                searchList = search_name.split(" ");
                searchList.forEach((element) => {
                    iLikeName.push({
                        name: {
                            [Op.like]: element,
                        },
                    });
                });
            }
            if (iLikeName.length > 0) {
                where = {
                    [Op.or]: iLikeName,
                    status: status,
                };
            } else {
                where = {
                    status: status,
                };
            }
            let list = await this.model.findAndCountAll({
                where: where,
                order: [order],
                limit: pagination.size,
                offset: (pagination.page - 1) * pagination.size,
            });
            list.page = pagination.page;
            list.size = pagination.size;
            return list;
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

    async delete(id) {
        let status = false;
        try {
            let isUpdated = await this.model.update({ status: status }, { where: { id: id } });
            if (isUpdated) {
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

module.exports = FoodService;
