const express = require("express");
const route = require("./src/routes/index");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "src/app/views"));
app.set("view engine", "jade");
app.use(cors());
//public file routers
app.use(express.static("src/public/src"));

app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);
app.use(express.json());

route(app);

app.listen(port, () => {
    console.log(`Server starting on port ${port}`);
});
