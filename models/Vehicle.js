const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VehicleSchema = new Schema({

  added_date: {
    type: Date,
    default: Date.now
  },
  vehicle_type: {
    type: String,
    default: 'please enter value. e.g, van, car, bus...'
  },
  vehicle_name: {
    type: String,
    required: true
  },
  vehicle_number: {
    type: String,
    default: 'please enter value'
  },
  vehicle_make: {
    type: String,
    default: 'please enter value'
  },
  vehicle_model: {
    type: String,
    default: 'please enter value'
  },
  vehicle_year: {
    type: Number,
    default: 2020
  },
  vehicle_mileage: {
    type: Number,
    min: 0,
    default: 2020
  },

  vehicle_lastOilChange: {
    type: Number,
    min: 0,
    default: 0
  },
  vehicle_state: {
    type: String,
    default: "MA"
  },
  vehicle_desc: {
    type: String,
    default: 'please enter value'
  },
  vehicle_image: {
    type: String,
    default: 'please enter value'
  },
  user: {
    type: String
  }
});
const CartVehicleSchema = new Schema({
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
  user: {
    type: String,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now
  }
});

const Vehicle = mongoose.model("vehicles", VehicleSchema);
const CartVehicle = mongoose.model("cartVehicle", CartVehicleSchema);


module.exports = {
  Vehicle,
  CartVehicle
}