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

router.get("/get/:id", discounts.getById);
router.get("/pagination", discounts.getList);
router.post("/create", checkAdmins, discounts.create);
router.put("/update/:id", checkAdmins, discounts.update);
router.delete("/delete/:id", checkAdmins, discounts.delete);

module.exports = router;
