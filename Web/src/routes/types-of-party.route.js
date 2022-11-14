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

router.get("/pagination", typesofparty.getList);
router.get("/detail/:id", typesofparty.getDetail);
router.post("/create", checkAdmins, typesofparty.create);
router.put("/update/:id", checkAdmins, typesofparty.update);
router.delete("/delete/:id", checkAdmins, typesofparty.delete);

module.exports = router;
