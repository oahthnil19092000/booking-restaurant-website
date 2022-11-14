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

router.post("/create", checkAdmins, mainingredientdetails.create);
router.get("/get-list/:food_id", mainingredientdetails.getListWithFoodID);
router.put("/update/:id", checkAdmins, mainingredientdetails.update);
router.delete("/delete/:id", checkAdmins, mainingredientdetails.delete);

module.exports = router;
