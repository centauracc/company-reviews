const companyDB = require("../models/company.model");

const displayAllCompanies = async (req, res) => {
  try {
    const allCompanies = await companyDB.find().lean();
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
