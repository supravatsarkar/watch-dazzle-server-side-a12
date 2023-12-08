const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    /**
     * Paste one or more documents here
     */
    // {
    //   "productId": "618d34ddbd3ba1dc49d89e67",
    //   "email": "admin@admin.com",
    //   "time": "2021-11-14T18:43:35.971Z",
    //   "status": "Shipped",
    //   "address": "agga",
    //   "phone": "fasd",
    //   "pin": "fsad"
    // }
    productId: {
      type: mongoose.Types.ObjectId,
      required: [true, "productId can't be empty"],
    },
    email: {
      type: String,
      required: [true, "email can't be empty"],
    },
    address: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

orderSchema.virtual("fullname").get(function () {
  console.log("run this", this);
  return this.deletedAt == null;
});
// orderSchema.pre("find", function () {
//   console.log("run this", this);
//   // return this.deletedAt == null;
// });
const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
