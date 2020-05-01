const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

router.get("/", companyController.displayAllCompanies);

module.exports = router;
