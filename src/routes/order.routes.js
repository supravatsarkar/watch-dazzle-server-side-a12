const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/order.controllers");

// create order
router.post("/", orderController.createOrder);
// get orders
router.get("/", orderController.getOrders);
// get order details by id
router.get("/:id", orderController.getOrderDetails);

// delete order api
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
