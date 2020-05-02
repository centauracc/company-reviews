const Companies = require("../models/company.model");

const displayAllCompanies = async (req, res, next) => {
  try {
    const allCompanies = await Companies.find({}, "-_id -__v -reviews").lean();
    res.json(allCompanies);
  } catch (err) {
    const cannotDisplayAllCompaniesError = new Error(
      "Unable to display all companies"
    );
    cannotDisplayAllCompaniesError.statusCode = 500;
    console.error(err);
    next(err);
  }
};

const displayOneCompany = async (req, res, next) => {
  try {
    const aCompany = await Companies.findOne(
      { id: req.params.id },
      "-_id -__v"
    ).lean();
    res.json(aCompany);
  } catch (err) {
    const cannotDisplayCompanyError = new Error("Unable to display company");
    cannotDisplayCompanyError.statusCode = 500;
    console.error(err);
    next(err);
  }
};

module.exports = { displayAllCompanies, displayOneCompany };
