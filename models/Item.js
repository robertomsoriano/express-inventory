const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  added_date: {
    type: Date,
    default: Date.now
  },
  item_type: {
    type: String,
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  item_number: {
    type: String
  },
  item_price: {
    type: Number,
    required: true
  },
  item_quantity: {
    type: Number,
    min: 0
  },
  item_desc: {
    type: String
  },
  item_image: {
    type: String
  },
  user: {
    type: String
  }
});

module.exports = Item = mongoose.model("items", ItemSchema);
