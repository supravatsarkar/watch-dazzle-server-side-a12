const reviewService = require("./../services/review.service");
const mongoose = require("mongoose");

const getReviews = async (req, res, next) => {
  try {
    const limit = req.query.limit ? req.query.limit : 10;
    const skip = req.query.skip ? req.query.skip : 0;
    const count = await reviewService.countReviews();
    console.log("Count:", count);
    const result = await reviewService.getReviews({}, limit, skip, {
      createdAt: -1,
    });
    // console.log("result=>", result);
    const finalRes = { count, reviews: result };
    res.json({ status: "success", data: finalRes });
  } catch (error) {
    next(error);
  }
};

const getReviewDetails = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ status: "fail", error: "Invalid id" });
    const result = await reviewService.getReviewById(req.params.id);
    if (!result)
      return res
        .status(400)
        .json({ status: "fail", error: "Review does not exist" });
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const result = await reviewService.createReview(req.body);
    console.log("result=>", result);
    res.json({ status: "success", message: "Inserted review", data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReviews, addReview, getReviewDetails };
