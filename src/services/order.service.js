const OrderModel = require("../models/Order.model");

const getOrders = async (
  filter = {},
  limit = 10,
  skip = 0,
  sort = { _id: 1 }
) => {
  // filter.active = true;
  try {
    // await OrderModel.updateMany({}, { deletedAt: null });
    return await OrderModel.find({ fullname: true })
      .skip(skip)
      .limit(limit)
      .sort(sort);
  } catch (error) {
    throw error;
  }
};
const getOrderById = async (id) => {
  try {
    return await OrderModel.findById(id);
  } catch (error) {
    throw error;
  }
};
const countOrders = async (filter = {}) => {
  try {
    // filter.isDeleted = false;
    return await OrderModel.count(filter);
  } catch (error) {
    throw error;
  }
};
const createOrder = async (data) => {
  try {
    return await OrderModel.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports = { getOrders, createOrder, countOrders, getOrderById };
