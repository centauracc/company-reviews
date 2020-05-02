const companyDB = require("../models/company.model");

const displayAllCompanies = async (req, res, next) => {
  try {
    const allCompanies = await companyDB.find({}, "-_id -__v -reviews").lean();
    console.log("allCompanies", allCompanies);
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

module.exports = { displayAllCompanies };
