const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createJWTToken } = require("../utils/jwt");

const registerOneUser = async (req, res, next) => {
  try {
    const userRaw = new User(req.body);
    await userRaw.save();
    const { _id, __v, ...user } = userRaw.toObject();
    res.status(201).json(user);
  } catch (err) {
    const cannotRegisterOneUser = new Error("Unable to register user");
    cannotRegisterOneUser.statusCode = 500;
    console.error(err);
    next(err);
  }
};

const signInUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username: username });

    if (!foundUser) {
      const userNotFoundError = new Error("User not found");
      userNotFoundError.statusCode = 401;
      throw userNotFoundError;
    }

    const result = await bcrypt.compare(password, foundUser.password);
    if (!result) {
      const invalidPasswordError = new Error("Invalid password");
      invalidPasswordError.statusCode = 401;
      throw invalidPasswordError;
    }

    const token = createJWTToken(username);
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      res.cookie("token", token, {
        expires: expiryDate,
        httpOnly: true,
        signed: true,
      });
    } else {
      res.cooke("token", token, {
        expires: expiryDate,
        httpOnly: true,
        secure: true,
        signed: true,
      });
    }

    res.send("You are now signed in");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { registerOneUser, signInUser };
