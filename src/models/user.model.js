const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");

const userSchema = new Schema({
  id: {
    type: String,
    default: uuid,
  },
  username: {
    type: String,
    required: [true, "can't be blank"],
    lowercase: true,
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "is invalid"],
    index: true,
    unique: true,
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const rounds = 10;
    this.password = await bcrypt.hash(this.password, rounds);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
