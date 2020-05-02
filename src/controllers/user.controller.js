const User = require("../models/user.model");

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

module.exports = { registerOneUser };
