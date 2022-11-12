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

router.get("/pagination", tables.getList);
router.get("/detail/:id", tables.getDetail);
router.post("/create", tables.create);
router.put("/update/:id", tables.update);
router.delete("/delete/:id", tables.delete);

module.exports = router;
