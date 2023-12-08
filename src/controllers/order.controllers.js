const orderService = require("../services/order.service");
const mongoose = require("mongoose");

const getOrders = async (req, res, next) => {
  try {
    const limit = req.query.limit ? req.query.limit : 10;
    const skip = req.query.skip ? req.query.skip : 0;
    const count = await orderService.countOrders();
    console.log("Count:", count);
    const result = await orderService.getOrders({}, limit, skip, {
      createdAt: -1,
    });
    // console.log("result=>", result);
    const finalRes = { count, orders: result };
    res.json({ status: "success", data: finalRes });
  } catch (error) {
    next(error);
  }
};

const getOrderDetails = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ status: "fail", error: "Invalid id" });
    const result = await orderService.getOrderById(req.params.id);
    if (!result)
      return res
        .status(400)
        .json({ status: "fail", error: "Review does not exist" });
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req.body);
    console.log("result=>", result);
    res.json({
      status: "success",
      message: "Inserted order success!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (req, res, next) => {
  try {
    const result = await orderService.createOrder(req.body);
    console.log("result=>", result);
    res.json({
      status: "success",
      message: "Inserted order success!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrders, createOrder, getOrderDetails, deleteOrder };
