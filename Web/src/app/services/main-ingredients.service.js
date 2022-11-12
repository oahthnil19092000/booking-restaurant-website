const { Op } = require('sequelize');
class MainIngredientService {
	constructor(models) {
		this.model = models.MainIngredients;
	}

	async create(data) {
		try {
			let [ table, created ] = await this.model.findOrCreate({ where: data });
			if (created) {
				return table;
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
			let result = await this.model.findOne({ where: { id: id, status: status } });
			return result;
		} catch (err) {
			return null;
		}
	}

	async getList(pagination, order, search_name) {
		let status = true;
		try {
			let where = null;
			let iLikeName = [];
			if (search_name != null && search_name != '' && search_name != undefined) {
				let searchList = search_name.split(' ');
				search_name = '%' + searchList.join('% %') + '%';
				searchList = search_name.split(' ');
				searchList.forEach((element) => {
					iLikeName.push({
						name : {
							[Op.like]: element
						}
					});
				});
			}
			if (iLikeName.length > 0) {
				where = {
					[Op.or]: iLikeName,
					status  : status
				};
			} else {
				where = {
					status : status
				};
			}
			let list = await this.model.findAndCountAll({
				where  : where,
				order  : [ order ],
				limit  : pagination.size,
				offset : (pagination.page - 1) * pagination.size
			});
			list.page = pagination.page;
			list.size = pagination.size;
			return list;
		} catch (err) {
			return null;
		}
	}

	async getAll() {
		let status = true;
		try {
			let list = await this.model.findAll({
				where : {
					status : status
				}
			});
			return list;
		} catch (err) {
			return null;
		}
	}

	async update(id, data) {
		let status = true;
		try {
			let isUpdated = await this.model.update(data, {
				where : { id: id, status: status }
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
				truncate : true
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

module.exports = MainIngredientService;
