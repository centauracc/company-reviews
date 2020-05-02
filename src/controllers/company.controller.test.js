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
    const {
      _id,
      __v,
      reviews,
      ...allCompaniesWithoutReviewData
    } = companiesData[0];
    const allCompaniesWithoutReviewDataArray = [];
    allCompaniesWithoutReviewDataArray.push(allCompaniesWithoutReviewData);
    expect(body).toMatchObject(allCompaniesWithoutReviewDataArray);
  });

  it("should display details of one company and its corresponding review(s)", async () => {
    const { body } = await request(app)
      .get(`/companies/${companiesData[0].id}`)
      .expect(200);
    const { _id, __v, ...aCompanyDataWithReviews } = companiesData[0];
    expect(body).toMatchObject(aCompanyDataWithReviews);
  });
});
