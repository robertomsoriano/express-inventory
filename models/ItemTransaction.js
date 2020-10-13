const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemTransactionSchema = new Schema({
  transac_type: {
    type: String
  },
  transac_operator: {
    type: String
  },
  transac_customer: {
    type: Object
  },
  transac_vehicle: {
    type: String
  },
  transac_items: {
    type: [Object]
  },
  sale_transac: {
    type: Boolean
  },
  transac_subtotal: {
    type: Number,
    required: true
  },
  transac_discount: {
    type: Number
  },
  transac_taxes: {
    type: Number
  },
  transac_total: {
    type: Number,
    required: true
  },
  amount_received: {
    type: Number,
    required: true
  },
  transac_message: {
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
  transac_status: {
    type: String,
    default: "reconciled"
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = ItemTransaction = mongoose.model(
  "itemTransactions",
  ItemTransactionSchema
);
