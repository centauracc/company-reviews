const Company = require("../models/company.model");
const companiesData = require("../../data/companiesData");
const request = require("supertest");
const app = require("../../app");
const teardownMongoose = require("../../tests/mongoose");

describe("company.controller", () => {
  afterAll(async () => await teardownMongoose());

  beforeEach(async () => {
    await Company.create(companiesData);
  });

  afterEach(async () => {
    await Company.deleteMany();
  });

  it("should display a list of companies without their respective reviews", async () => {
    const { body } = await request(app).get("/companies").expect(200);
    const companiesDataToCompare = [
      {
        id: companiesData[0].id,
        companyName: companiesData[0].companyName,
        companySuffix: companiesData[0].companySuffix,
        numberOfEmployees: companiesData[0].numberOfEmployees,
        description: companiesData[0].description,
      },
    ];
    console.log("companiesDataToCompare", companiesDataToCompare);
    expect(body).toMatchObject(companiesDataToCompare);
  });
});
