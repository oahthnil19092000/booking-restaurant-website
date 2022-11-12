const models = require("../../../models");
const message = require("../businesses/message-handler");
const { writeFile } = require("fs");
const generateBillId = require("../businesses/generate-bill_id");
require("dotenv").config();
const path = require("path");
const Validator = require("fastest-validator");
const scheme = require("../businesses/validation-handler");

const {
    UserService,
    TypeOfPartyService,
    TicketService,
    TableService,
    OrderService,
    MainIngredientDetailService,
    MainIngredientService,
    FoodService,
    FeedbackService,
    DiscountService,
    CommentService,
    BillService,
} = require("../services/index.service");
const messageHandler = require("../businesses/message-handler");

const billService = new BillService(models);
const orderService = new OrderService(models);
const discountService = new DiscountService(models);
const sortObject = (obj) => {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
};
class PaymentController {
    async create_payment_url(req, res, next) {
        var dateFormat = require("dateformat");
        var date = new Date();
        let ticket_id = req.params.ticket_id;
        let detailBill = await orderService.getSumTotalOfTicket(ticket_id);
        let amount = parseInt(detailBill[0].sum_total);
        var desc = "Thanh toan don hang thoi gian: " + dateFormat(date, "yyyy-mm-dd HH:mm:ss");
        res.render("order", { title: "Tạo mới đơn hàng", amount: amount, description: desc });
    }

    async create_payment_url_handler(req, res, next) {
        var ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var config = require("config");
        var dateFormat = require("dateformat");
        let ticket_id = req.params.ticket_id;
        let detailBill = await orderService.getSumTotalOfTicket(ticket_id);
        var tmnCode = config.get("vnp_TmnCode");
        var secretKey = config.get("vnp_HashSecret");
        var vnpUrl = config.get("vnp_Url");
        var returnUrl = config.get("vnp_ReturnUrl") + "/" + ticket_id;

        var date = new Date();

        var createDate = dateFormat(date, "yyyymmddHHmmss");
        var orderId = dateFormat(date, "HHmmss");
        var amount = parseInt(detailBill[0].sum_total);
        var bankCode = req.body.bankCode;

        var orderInfo = req.body.orderDescription;
        var orderType = req.body.orderType;
        var locale = req.body.language;
        if (locale === null || locale === "") {
            locale = "vn";
        }
        var currCode = "VND";
        var vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params["vnp_OrderInfo"] = orderInfo;
        vnp_Params["vnp_OrderType"] = orderType;
        vnp_Params["vnp_Amount"] = amount * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== null && bankCode !== "") {
            vnp_Params["vnp_BankCode"] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var querystring = require("qs");
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(vnpUrl);
    }

    async vnpay_return(req, res, next) {
        var vnp_Params = req.query;

        var secureHash = vnp_Params["vnp_SecureHash"];

        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);

        var config = require("config");
        var tmnCode = config.get("vnp_TmnCode");
        var secretKey = config.get("vnp_HashSecret");

        var querystring = require("qs");
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            let bill = {
                bill_number: generateBillId(),
                ticket_id: parseInt(req.params.ticket_id),
                admin_id: 0,
                discount_id: 1,
                status: true,
            };
            try {
                let detailBill = await orderService.getSumTotalOfTicket(bill.ticket_id);

                bill.sum_total = parseInt(detailBill[0].sum_total);
                let discount = await discountService.getById(bill.discount_id);
                let amountCoupon = 0;
                if (discount != null) {
                    amountCoupon =
                        discount.amount != null
                            ? discount.amount
                            : (bill.sum_total * discount.percent) / 100;
                }
                bill.sum_total -= amountCoupon;
                let newBill = await billService.create(bill);
                res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
            } catch (err) {
                res.render("success", { code: "97" });
            }
        } else {
            res.render("success", { code: "97" });
        }
    }

    async vnpay_ipn(req, res, next) {
        var vnp_Params = req.query;
        var secureHash = vnp_Params["vnp_SecureHash"];

        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);
        var config = require("config");
        var secretKey = config.get("vnp_HashSecret");
        var querystring = require("qs");
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

        if (secureHash === signed) {
            var orderId = vnp_Params["vnp_TxnRef"];
            var rspCode = vnp_Params["vnp_ResponseCode"];

            res.status(200).json({ RspCode: "00", Message: "success" });
        } else {
            res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
        }
    }
}
module.exports = new PaymentController();
