const User = require("../models/user.model");
const UserData = require("../../data/userData");
const request = require("supertest");
const app = require("../../app");
const teardownMongoose = require("../../tests/mongoose");

describe("user.controller", () => {
  afterAll(async () => await teardownMongoose());

  beforeEach(async () => await User.create(UserData));

  afterEach(async () => await User.deleteMany());

  it("should allow registration of one user", async () => {
    const newUser = {
      username: "AngMoLang",
      firstName: "Mo Lang",
      lastName: "Ang",
      password: "87654321",
      email: "molang.ang@amoyquee.xyz",
    };
    const { body } = await request(app)
      .post("/user/register")
      .send(newUser)
      .expect(201);
    expect(body.username).toEqual(newUser.username.toLowerCase());
    expect(body.firstName).toEqual(newUser.firstName);
    expect(body.lastName).toEqual(newUser.lastName);
    expect(body.password).not.toBe(newUser.password);
    expect(body.email).toEqual(newUser.email);
  });

  it("should allow user to sign in", async () => {
    const signInUser = {
      username: UserData[0].username,
      password: UserData[0].password,
    };
    const { text } = await request(app)
      .post("/user/login")
      .send(signInUser)
      .expect(200);
    expect(text).toEqual("You are now signed in");
  });
});
