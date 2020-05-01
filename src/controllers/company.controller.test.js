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
    expect(body).toMatchObject(companiesData);
  });
});
