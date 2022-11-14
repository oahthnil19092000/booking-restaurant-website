const express = require("express");
const router = express.Router();
const checkAuth = require("../app/middlewares/authentication");
const checkAdmins = require("../app/middlewares/check-admin");
const {
    bills,
    comments,
    discounts,
    feedbacks,
    foods,
    mainingredientdetails,
    mainingredient,
    orders,
    tables,
    tickets,
    typesofparty,
    users,
} = require("../app/controllers/index.controller");

router.get("/get-with-comment-id/:comment_id", feedbacks.getByCommentId);
router.get("/get-with-admin-id/:admin_id", feedbacks.getByAdminId);
router.post("/create", checkAdmins, feedbacks.create);
router.put("/update/:id", checkAdmins, feedbacks.update);
router.delete("/delete/:id", checkAdmins, feedbacks.delete);

module.exports = router;
