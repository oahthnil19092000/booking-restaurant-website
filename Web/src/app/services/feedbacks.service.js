class FeedbackService {
    constructor(models) {
        this.model = models.Feedbacks;
    }

    async create(data) {
        try {
            let [feedback, created] = await this.model.findOrCreate({ where: {
               admin_id: data.admin_id,
               comment_id: data.comment_id
            }, 
            defaults: {
                content: data.content
            }
         });
            if (created) {
                return feedback;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async getById(id) {
        try {
            let feedback = await this.model.findOne({ where: { id: id } });
            return feedback;
        } catch (err) {
            return null;
        }
    }

    async getByCommentId(comment_id) {
        try {
            let feedback = await this.model.findOne({
                where: { comment_id: comment_id },
            });
            return feedback;
        } catch (err) {
            return null;
        }
    }

    async getByAdminId(admin_id) {
        try {
            let feedback = await this.model.findOne({ where: { admin_id: admin_id } });
            return feedback;
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

module.exports = FeedbackService;
