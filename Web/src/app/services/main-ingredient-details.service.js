class MainIngredientDetailService {
    constructor(models) {
        this.model = models.MainIngredientDetails;
    }

    async create(data) {
        try {
            let [main_ingredient_detail, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return main_ingredient_detail;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let main_ingredient_detail = await this.model.findOne({ where: { id: id } });
            return main_ingredient_detail;
        } catch (err) {
            return null;
        }
    }

    async getByMainIngredientId(main_ingredient_id) {
        try {
            let main_ingredient_detail = await this.model.findOne({
                where: { main_ingredient_id: main_ingredient_id },
            });
            return main_ingredient_detail;
        } catch (err) {
            return null;
        }
    }

    async getByFoodId(food_id) {
        try {
            let main_ingredient_detail = await this.model.findAll({ where: { food_id: food_id } });
            return main_ingredient_detail;
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
            let isRemoved = await this.model.destroy({ where: { food_id: id } });
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

module.exports = MainIngredientDetailService;
