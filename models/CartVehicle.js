const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartVehicleSchema = new Schema({
    vehicle: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

module.exports = CartVehicle = mongoose.model("cartVehicle", CartVehicleSchema);
