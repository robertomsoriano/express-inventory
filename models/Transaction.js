const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
  seller: {
    type: String,
    required: true
  },
  assistant: {
    type: String,
    required: true
  },
  customer: {
    type: Object
    // Don't required customer data for now
    // ,required: true
  },
  sale_date: {
    type: Date,
    default: Date.now
  },
  invoice_number: {
    type: String,
    default: Date.now()
  },
  items: {
    type: [Object]
  },
  sale: {
    type: Boolean
  },
  subtotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  taxes: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  amount_received: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema
);
