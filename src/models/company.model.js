const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 1,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    minlength: 3,
  },
});

const companySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
    minlength: 3,
  },
  companySuffix: { type: String },
  numberOfEmployees: { type: Number },
  description: { type: String },
  reviews: [reviewSchema],
});

const Companie = mongoose.model("Companie", companySchema);

module.exports = Companie;
