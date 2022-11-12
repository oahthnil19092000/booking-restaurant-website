class CommentService {
    constructor(models) {
        this.model = models.Comments;
    }

    async create(data) {
        try {
            let [comment, created] = await this.model.findOrCreate({ where: data });
            if (created) {
                return comment;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let comment = await this.model.findOne({ where: { id: id } });
            return comment;
        } catch (err) {
            return null;
        }
    }

    async getByBillId(bill_id) {
        try {
            let comment = await this.model.findOne({ where: { bill_id: bill_id } });
            return comment;
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

module.exports = CommentService;
