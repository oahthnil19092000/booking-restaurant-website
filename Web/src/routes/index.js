const bills = require("./bills.route");
const comments = require("./comments.route");
const discounts = require("./discounts.route");
const feedbacks = require("./feedbacks.route");
const foods = require("./foods.route");
const mainingredientdetails = require("./main-ingredient-details.route");
const mainingredients = require("./main-ingredients.route");
const orders = require("./orders.route");
const tables = require("./tables.route");
const tickets = require("./tickets.route");
const typesofparty = require("./types-of-party.route");
const users = require("./users.route");
const payment = require("./payment.route");
const authentication = require("../app/middlewares/authentication");
const checkAdmin = require("../app/middlewares/check-admin");
function route(app) {
    //api routers
    let urlDefault = "/api/";
    app.use(urlDefault + "bill",authentication, bills);
    app.use(urlDefault + "comment",authentication, comments);
    app.use(urlDefault + "discount",authentication, discounts);
    app.use(urlDefault + "feedback",authentication, feedbacks);
    app.use(urlDefault + "food",authentication, foods);
    app.use(urlDefault + "main-ingredient-detail",authentication, mainingredientdetails);
    app.use(urlDefault + "main-ingredient",authentication, mainingredients);
    app.use(urlDefault + "order",authentication, orders);
    app.use(urlDefault + "table",authentication, tables);
    app.use(urlDefault + "ticket",authentication, tickets);
    app.use(urlDefault + "type-of-party",authentication, typesofparty);
    app.use(urlDefault + "user", users);
    app.use("/payment", payment);
}
module.exports = route;
