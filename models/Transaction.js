const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
  operator: {
    type: String
  },
  customer: {
    type: Object
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
  transac_date: {
    type: Date,
    default: Date.now
  },
  invoice_number: {
    type: String,
    default: Date.now()
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
