const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  book_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  sale_price: {
    type: Number,
    required: true
  },
  quantity: {
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
  release_date: {
    type: Date
  },
  user: {
    type: String,
    required: true
  },
  // expire_at: { type: Date, default: Date.now, expires: 180 }
  date_added: {
    type: Date,
    default: Date.now
  }
});
CartSchema.pre("init", function(next) {
  this.item_total = this.price * this.quantity;
});
CartSchema.post("init", function(next) {
  this.item_total = this.price * this.quantity;
});
module.exports = Cart = mongoose.model("cart", CartSchema);
