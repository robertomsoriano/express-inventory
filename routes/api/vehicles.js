const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Vehicle Model
const Vehicle = require('../../models/Vehicle');

// @route   GET api/vehicles
// @desc    Get All vehicles
// @access  Public
router.get('/', (req, res) => {
    Vehicle.find()
        .sort({ date: -1 })
        .then(vehicles => res.json(vehicles));
});


// @route   GET api/vehicles/:type
// @desc    Get All vehicles by type
// @access  Public
router.get('/:type', (req, res) => {
    Vehicle.find({ vehicle_type: req.params.type })
        .sort({ date: -1 })
        .then(vehicles => res.json(vehicles));
});


// @route   POST api/vehicles
// @desc    Create An Vehicle
// @access  Private
router.post('/', auth, (req, res) => {
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

    newVehicle.save().then(vehicle => res.json(vehicle));
});



// @route   PUT api/vehicles/:id
// @desc    PUT to vehicles
// @access  Private
router.put("/:id", auth, (req, res) => {
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
        !vehicle_number ||
        !vehicle_make ||
        !vehicle_model ||
        !vehicle_year ||
        !vehicle_mileage ||
        !vehicle_lastOilChange ||
        !vehicle_state ||
        !vehicle_desc ||
        !vehicle_image
    ) {
        return res
            .status(400)
            .json({ msg: "Vehicle was not saved. Please enter all required fields." });
    }
    Vehicle.findById(req.params.id, (err, vehicle) => {
        if (err || vehicle === null) {
            return res
                .status(400)
                .json({ msg: "Vehicle was not saved. Please enter all required fields and verify you are using a valid vehicle ID." });
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
            (vehicle.vehicle_image = vehicle_image)

        vehicle.save();
        res.json(vehicle);
    });
});


// @route   DELETE api/vehicles/:id
// @desc    Delete A Vehicle
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => vehicle.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false, msg: "Are you using a valid vehicle ID?" }));
});
module.exports = router;
