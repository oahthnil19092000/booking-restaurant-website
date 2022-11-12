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

router.get("/get/:bill_id", comments.getByBillId);
router.post("/create", comments.create);
router.put("/update/:id", comments.update);
router.delete("/delete/:id", comments.delete);

module.exports = router;
