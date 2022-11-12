const express = require("express");
const router = express.Router();
const checkAuth = require("../app/middlewares/authentication");
const checkAdmins = require("../app/middlewares/check-admin");
const payments = require("../app/controllers/payment.controller");

router.get("/create_payment_url/:ticket_id", payments.create_payment_url);
router.post("/create_payment_url/:ticket_id", payments.create_payment_url_handler);
router.get("/vnpay_return/:ticket_id", payments.vnpay_return);
router.get("/vnpay_ipn/:ticket_id", payments.vnpay_ipn);
module.exports = router;
