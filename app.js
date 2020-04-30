const express = require("express");
const app = express();

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

module.exports = app;
