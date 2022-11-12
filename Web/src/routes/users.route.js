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

router.get("/admin-list", users.adminList);
router.get("/customer-list", users.customerList);
router.get("/detail/:id", users.detail);
router.post("/login", users.loginHandler);
router.post("/create-staff", users.createStaff);
router.post("/get-id", users.getIdByToken);
router.post("/signup", users.signupHandler);
router.put("/update_user_info", users.updateUserInfo);
router.put("/change-password", users.updatePassword);
router.delete("/delete/:id", users.deleteUser);

module.exports = router;
