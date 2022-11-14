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

router.get("/pagination", mainingredient.getList);
router.get("/get-all", mainingredient.getAll);
router.get("/get/:id", mainingredient.getById);
router.post("/create", checkAdmins, mainingredient.create);
router.put("/update/:id", checkAdmins, mainingredient.update);
router.delete("/delete/:id", checkAdmins, mainingredient.delete);

module.exports = router;
