const express = require("express");
const router = express.Router();
const authentication = require("../app/middlewares/authentication");
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

router.get("/admin-list",authentication, checkAdmins, users.adminList);
router.get("/customer-list",authentication, checkAdmins, users.customerList);
router.get("/detail/:id",authentication, users.detail);
router.post("/login", users.loginHandler);
router.post("/create-staff",authentication, checkAdmins, users.createStaff);
router.post("/get-id",authentication, users.getIdByToken);
router.post("/signup", users.signupHandler);
router.put("/update_user_info",authentication, users.updateUserInfo);
router.put("/change-password",authentication, users.updatePassword);
router.delete("/delete/:id",authentication, checkAdmins, users.deleteUser);

module.exports = router;
