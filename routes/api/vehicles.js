const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ItemTransaction = require("../../models/ItemTransaction");
// Vehicle Model
const Vehicle = require("../../models/Vehicle");

// @route   GET api/vehicles
// @desc    Get All vehicles
// @access  Public
router.get("/", (req, res) => {
  Vehicle.find()
    .sort({ date: -1 })
    .then((vehicles) => res.json(vehicles));
});

// @route   GET api/vehicles/:type
// @desc    Get All vehicles by type
// @access  Public
router.get("/type/:type", (req, res) => {
  Vehicle.find({ vehicle_type: req.params.type })
    .sort({ date: -1 })
    .then((vehicles) => res.json(vehicles));
});

// @route   GET api/vehicles/:id
// @desc    GET user all vehicle's transactions
// @access  Public
router.get("/single/:id", (req, res) => {
  Vehicle.findById(req.params.id).then((veh) => res.send(veh));
});

// @route   GET api/vehicles/:vechicleID
// @desc    GET user all vehicle's transactions
// @access  Public
router.get("/transactions/:vehicleID", (req, res) => {
  // ItemTransaction.find({ user: req.user.id })
  ItemTransaction.find({ transac_vehicle: req.params.vehicleID })
    .sort({ invoice_number: -1 })
    .then((trans) => res.send(trans));
});

// @route   POST api/vehicles
// @desc    Create An Vehicle
// @access  Private
router.post("/", auth, (req, res) => {
  const {
    vehicle_type,
    vehicle_name,
    vehicle_number,
    vehicle_make,
    vehicle_model,
    vehicle_year,
    vehicle_mileage,
    vehicle_lastOilChange,
    vehicle_state,
    vehicle_desc,
    vehicle_image
  } = req.body;
  const newVehicle = new Vehicle({
    vehicle_type,
    vehicle_name,
    vehicle_number,
    vehicle_make,
    vehicle_model,
    vehicle_year,
    vehicle_mileage: parseFloat(vehicle_mileage),
    vehicle_lastOilChange,
    vehicle_state,
    vehicle_desc,
    vehicle_image,
    user: req.user.id
  });

  newVehicle.save().then((vehicle) => res.json(vehicle)).catch(err => res.status(404).json({ msg: "Vehicle could not be added." }))
});

// @route   PUT api/vehicles/:id
// @desc    PUT to vehicles
// @access  Private
router.put("/update/:vehicleID", auth, (req, res) => {
  const {
    vehicle_type,
    vehicle_name,
    vehicle_number,
    vehicle_make,
    vehicle_model,
    vehicle_year,
    vehicle_mileage,
    vehicle_lastOilChange,
    vehicle_state,
    vehicle_desc,
    vehicle_image
  } = req.body.vehicle;
  if (
    // Which values should be required for vehicle update? TO-DO!!
    !vehicle_type ||
    !vehicle_name ||
    !vehicle_make ||
    !vehicle_model ||
    !vehicle_year ||
    !vehicle_state ||
    !vehicle_image
  ) {
    return res.status(400).json({
      msg: "Vehicle was not saved. Please enter all required fields."
    });
  }
  Vehicle.findById(req.params.vehicleID, (err, vehicle) => {
    if (err || vehicle === null) {
      return res.status(400).json({
        msg:
          "Vehicle was not saved. Please enter all required fields and verify you are using a valid vehicle ID."
      });
    }
    (vehicle.vehicle_type = vehicle_type),
      (vehicle.vehicle_name = vehicle_name),
      (vehicle.vehicle_number = vehicle_number),
      (vehicle.vehicle_make = vehicle_make),
      (vehicle.vehicle_model = vehicle_model),
      (vehicle.vehicle_year = vehicle_year),
      (vehicle.vehicle_mileage = vehicle_mileage),
      (vehicle.vehicle_lastOilChange = vehicle_lastOilChange),
      (vehicle.vehicle_state = vehicle_state),
      (vehicle.vehicle_desc = vehicle_desc),
      (vehicle.vehicle_image = vehicle_image);

    vehicle.save().then(item => res.json(item)).catch(err => res.status(404).json({ msg: "Vehicle could not be added." }))
    // res.json(vehicle);
  }).catch(err => res.status(404).json({ msg: "Vehicle could not be added." }))
});

// @route   DELETE api/vehicles/:id
// @desc    Delete A Vehicle
// @access  Private
router.delete("/delete/:vehicleID", auth, (req, res) => {
  Vehicle.findById(req.params.vehicleID)
    .then((vehicle) => vehicle.remove().then(() => res.json({ success: true })))
    .catch((err) =>
      res
        .status(404)
        .json({ success: false, msg: "Are you using a valid vehicle ID?" })
    );
});
module.exports = router;
