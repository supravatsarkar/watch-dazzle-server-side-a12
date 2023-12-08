const ReviewModel = require("../models/Review.model");

const getReviews = async (
  filter = {},
  limit = 10,
  skip = 0,
  sort = { _id: 1 }
) => {
  try {
    return await ReviewModel.find(filter).skip(skip).limit(limit).sort(sort);
  } catch (error) {
    throw error;
  }
};
const getReviewById = async (id) => {
  try {
    return await ReviewModel.findById(id);
  } catch (error) {
    throw error;
  }
};
const countReviews = async (filter = {}) => {
  try {
    return await ReviewModel.count(filter);
  } catch (error) {
    throw error;
  }
};
const createOrder = async (data) => {
  try {
    return await ReviewModel.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports = { getReviews, createOrder, countReviews, getReviewById };
