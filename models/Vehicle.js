const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VehicleSchema = new Schema({
  added_date: {
    type: Date,
    default: Date.now
  },
  vehicle_type: {
    type: String
  },
  vehicle_name: {
    type: String,
    required: true
  },
  vehicle_number: {
    type: String
  },
  vehicle_make: {
    type: String
  },
  vehicle_model: {
    type: String
  },
  vehicle_year: {
    type: Number
  },
  vehicle_mileage: {
    type: Number,
    min: 0
  },
  vehicle_state: {
    type: String
  },
  vehicle_desc: {
    type: String
  },
  vehicle_image: {
    type: String
  },
  user: {
    type: String
  }
});

module.exports = VehicleSchema = mongoose.model("vehicles", VehicleSchema);
