require("dotenv").config();
require("./src/utils/db");
const express = require("express");

const app = express();
app.use(express.json()); // required if you use req.body

const companyRouter = require("./src/routes/company.route");
const userRouter = require("./src/routes/user.route");

app.get("/", (req, res) => {
  res.json({
    "0": "GET /",
    "1": "GET /companies",
    "2": "GET /companies/:id",
    "3": "POST /companies/:id/reviews",
    "4": "GET /user",
    "5": "POST /user/register",
    "6": "POST /user/login",
    "7": "POST /user/logout",
  });
});

app.use("/companies", companyRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({ message: err.message });
});

module.exports = app;
