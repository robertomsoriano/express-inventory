const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartItemSchema = new Schema({
  vehicle: {
    type: String,
    required: true
  },
  item_id: {
    type: String,
    required: true
  },
  item_type: {
    type: String,
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  item_quantity: {
    type: Number,
    required: true
  },
  item_price: {
    type: Number,
    required: true
  },
  item_total: {
    type: Number,
    required: true
  },
  item_image: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now
  }
  // expire_at: { type: Date, default: Date.now, expires: 180 }
});
CartItemSchema.pre("init", function (next) {
  this.item_total = this.item_price * this.item_quantity;
});
CartItemSchema.post("init", function (next) {
  this.item_total = this.item_price * this.item_quantity;
});
module.exports = CartItem = mongoose.model("cartItems", CartItemSchema);
