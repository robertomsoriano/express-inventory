const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartItemSchema = new Schema({
  item_id: {
    type: String,
    required: true
  },
  item_quantity: {
    type: Number,
    required: true
  },
  item_total: {
    type: Number,
    required: true
  },
  pic: {
    type: String
  },
  user: {
    type: String,
    required: true
  }
  // expire_at: { type: Date, default: Date.now, expires: 180 }
});
CartItemSchema.pre("init", function (next) {
  this.item_total = this.price * this.quantity;
});
CartItemSchema.post("init", function (next) {
  this.item_total = this.price * this.quantity;
});
module.exports = CartItem = mongoose.model("cartItems", CartItemSchema);
