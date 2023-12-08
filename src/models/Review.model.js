const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName can't be empty"],
    },
    userEmail: {
      type: String,
      required: [true, "userEmail can't be empty"],
    },
    userImg: {
      type: String,
    },
    productName: {
      type: String,
      required: [true, "productName can't be empty"],
    },
    comment: {
      type: String,
      required: [true, "comment can't be empty"],
    },
    rating: {
      type: Number,
      required: [true, "rating can't be empty"],
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
