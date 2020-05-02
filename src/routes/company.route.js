const express = require("express");
const router = express.Router();
const {
  displayAllCompanies,
  displayOneCompany,
} = require("../controllers/company.controller");

router.get("/", displayAllCompanies);
router.get("/:id", displayOneCompany);

module.exports = router;
