const request = require("supertest");
const app = require("./app");

describe("App", () => {
  it("should display a list of routes when accessing GET /", async () => {
    const listOfRoutes = {
      "0": "GET /",
      "1": "GET /companies",
      "2": "GET /companies/:id",
      "3": "POST /companies/:id/reviews",
      "4": "GET /user",
      "5": "POST /user/register",
      "6": "POST /user/login",
      "7": "POST /user/logout",
    };

    const { body } = await request(app).get("/").expect(200);
    expect(body).toMatchObject(listOfRoutes);
  });
});
