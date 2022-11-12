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

router.get("/pagination", tickets.getListOrder);
router.get("/pagination-reserve", tickets.getListReserveTable);
router.get("/get/:id", tickets.getById);
router.get("/get-pending-order/:customer_id", tickets.getPendingOrderTicketOfCustomer);
router.get("/get-pending-reserve/:customer_id", tickets.getPendingReserveTicketOfCustomer);
router.get("/get-ordered/:customer_id", tickets.getListOrderdOfCustomer);
router.get("/get-reserved/:customer_id", tickets.getListReservedOfCustomer);
router.post("/create", tickets.create);
router.put("/update/:id", tickets.update);
router.put("/update-payment-date/:id", tickets.updatePaymentDate);
router.delete("/delete/:id", tickets.delete);

module.exports = router;
