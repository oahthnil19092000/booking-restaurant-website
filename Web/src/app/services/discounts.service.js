const { Op } = require("sequelize");
class DiscountService {
    constructor(models) {
        this.model = models.Discounts;
    }

    async create(data) {
        try {
            let [discount, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return discount;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let discount = await this.model.findOne({ where: { id: id } });
            return discount;
        } catch (err) {
            return null;
        }
    }

    async getList(pagination, order, search_name) {
        try {
            let where = null;
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
                    id: {
                        [Op.ne]: 0,
                    },
                };
            } else {
                where = {
                    id: {
                        [Op.ne]: 0,
                    },
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

module.exports = DiscountService;
