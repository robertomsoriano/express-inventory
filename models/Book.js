const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
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
  disc_price: {
    type: Number
  },
  sale_price: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    min: 0,
    required: true
  },
  pic: {
    type: String
  },
  release_date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String
    // ,
    // required: true
  },
  categories: {
    type: Array
  }
  // expire_at: { type: Date, default: Date.now, expires: 180 }
});

module.exports = Book = mongoose.model("books", BookSchema);
