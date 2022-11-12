const bcrypt = new require("bcrypt");
const { Op } = require("sequelize");
class UserService {
    constructor(models) {
        this.model = models.Users;
    }

    async create(data) {
        try {
            let [user, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return user;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let user = await this.model.findOne({ where: { id: id, status: true } });
            return user;
        } catch (err) {
            return null;
        }
    }

    async getByName(name) {
        try {
            let user = await this.model.findOne({ where: { name: name, status: true } });
            return user;
        } catch (err) {
            return null;
        }
    }

    async getByUsername(username) {
        try {
            let user = await this.model.findOne({ where: { username: username, status: true } });
            return user;
        } catch (err) {
            return null;
        }
    }

    async getByToken(refreshToken) {
        try {
            let user = await this.model.findOne({
                where: { refreshToken: refreshToken, status: true },
            });
            return user;
        } catch (err) {
            return null;
        }
    }

    async getIdByUserLogin(username, password) {
        try {
            let user = await this.model.findOne({
                where: { username: username, status: true },
            });
            if (user != null) {
                let isCompare = await bcrypt.compare(password, user.password);
                if (isCompare) {
                    return user.id;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getList(is_admin, pagination, order, search_name) {
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
                    is_admin: is_admin,
                    status: status,
                    id: { [Op.gt]: 0 },
                };
            } else {
                where = {
                    is_admin: is_admin,
                    status: status,
                    id: { [Op.gt]: 0 },
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
            let isUpdated = await this.model.update(data, { where: { id: id, status: status } });
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

module.exports = UserService;
