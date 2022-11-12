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

router.get("/get-with-customer/:customer_id", bills.getListWithCustomerId);
router.get("/get-pending-of-customer/:customer_id", bills.getListPendingOfCustomer);
router.get("/is-paid/:id", bills.isPaid);
router.get("/get-total-revenue-of-order", bills.getTotolRevenueOfOrderInCurrentMonth);
router.get("/get-total-revenue", bills.getTotolRevenueInCurrentMonth);
router.get("/get-list-total-revenue", bills.getTotolRevenueListOfYear);
router.get("/get-best-seller", bills.getTheBestSellingProductInCurrentMonth);
router.get("/get-most-table-type-booked", bills.getTheMostBookedTableTypeInCurrentMonth);
router.get("/detail/:id", bills.detail);
router.post("/create", bills.create);
router.put("/payment/:id", bills.payment);
router.delete("/delete/:id", bills.delete);

module.exports = router;
