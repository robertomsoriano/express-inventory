const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const auth = require("../../middleware/auth");
// Item Model (to check stock)
const Item = require("../../models/Item");
// CartItem Model
const CartItem = require("../../models/CartItem");
const { Vehicle, CartVehicle } = require("../../models/Vehicle");
// Helper Functions
// Check If Enough Items in Stock
const checkStock = async (itemID, quantityRequested) => {
  let itemToCheck = await Item.findById(itemID);
  let quantityInCart = await CartItem.findById(itemID);
  if (!quantityInCart) { return true }
  return (await itemToCheck.item_quantity) > quantityInCart.item_quantity
    ? true
    : false;
};

// @route   GET api/cart-items
// @desc    Get all cartItems
// @access  Private
router.get("/", auth, (req, res) => {
  console.log(`CartItem GET Req at ${Date()}`);
  try {
    CartItem.find({ user: req.user.id })
      .sort({ date_added: -1 })
      .then((items) => res.send(items));
  } catch (e) {
    return res.status(400).json({ msg: "User's cart is empty" });
  }
});

// Cart Vehicle

// @route   GET api/cart-items/vehicle
// @desc    Get The Current Cart Vehicle
// @access  Private
router.get("/vehicle", auth, async (req, res) => {
  console.log(`CartVehicle GET Req at ${Date()}`);
  try {
    let cartVehicle = await CartVehicle.find({ user: req.user.id })
    let vehicle = await Vehicle.findById(new ObjectId(cartVehicle[0].vehicle))
    return res.json(await vehicle)
  } catch (e) {
    return res.status(400).json({ msg: "User's cart is empty" });
  }
});
// @route   POST api/cart-items/vehicle
// @desc    Create or Replace Cart Vehicle
// @access  Private
router.post('/vehicle', auth, async (req, res) => {
  console.log(`CartVehicle POST Req at ${Date()}`);
  try {
    await CartVehicle.deleteMany({ user: req.user.id })
    const newCartVehicle = new CartVehicle({
      vehicle: req.body,
      user: req.user.id
    });

    newCartVehicle.save().then(item => res.json(item)).catch(err => res.status(404).json({ msg: "CartVehicle could not be added." }))
  } catch (err) {
    return res.status(404).json({ msg: "CartVehicle could not be added." });
  }
});
// @route   Delete api/cart-items/vehicle
// @desc    Remove The Current Cart Vehicle
// @access  Private
router.delete('/vehicle', auth, async (req, res) => {
  console.log(`CartVehicle DELETE Req at ${Date()}`);
  try {
    await CartVehicle.deleteMany({ user: req.user.id }).then((item) => res.send([]))
  } catch (err) {
    console.log(err)
    res.status(404).json({ msg: false });
  }
});

// End Cart Vehicle

// @route   PUT api/cart-items/add
// @desc    Add item to cart (or inc quantity)
// @access  Private
router.put("/add", auth, async (req, res) => {
  console.log(`Cart Item Increase Requested.`);
  // If item is already in the Cart, quantity will increase.
  //Else, item will be added.
  try {
    // Check if enough stock first
    if (
      (await checkStock(req.body.item._id, req.body.item.item_quantity)) ===
      true
    ) {
      await CartItem.findOneAndUpdate(
        { _id: req.body.item._id, user: req.user.id },
        {
          $inc: { item_quantity: 1 },
          item_name: req.body.item.item_name,
          item_price: req.body.item.item_price,
          item_type: req.body.item.item_type,
          item_image: req.body.item.item_image
        },
        {
          new: true,
          upsert: true
        }
      );
      return CartItem.find({ user: req.user.id }, (err, cart) => {
        res.send(cart);
      });
    } else {
      throw new Error("Not Enough Stock");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: false });
  }
});

// @route   PUT api/cart-items/decrease
// @desc    Decrease item to cart (or dec quantity)
// @access  Private
router.put("/decrease", auth, async (req, res) => {
  console.log(`Cart Item Decrease Requested.`);
  // Item quantity will decrease.
  //If it falls below one, it will be deleted.
  try {
    await CartItem.findOneAndUpdate(
      { _id: req.body.item.item_id, user: req.user.id },
      {
        $inc: { item_quantity: -1 },
        item_name: req.body.item.item_name,
        item_price: req.body.item.item_price,
        item_type: req.body.item.item_type,
        item_image: req.body.item.item_image
      },
      {
        new: true,
        upsert: true
      }
    );
    return CartItem.find({ user: req.user.id }, (err, cart) => {
      res.send(cart);
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: false });
  }
});

// @route   DELELTE api/cart-items
// @desc    Remove item from cart
// @access  Private
router.put("/delete-item", auth, async (req, res) => {
  try {
    await CartItem.findById(req.body.item.item_id).then((item) =>
      item.remove().then(() =>
        CartItem.find({ user: req.user.id }, (err, cart) => {
          res.send(cart);
        })
      )
    );
  } catch (err) {
    res.status(404).json({ msg: false });
  }
});
router.delete('/delete-item/:id', auth, (req, res) => {
  CartItem.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, msg: "Are you using a valid item ID?" }));
});

// @route   DELELTE api/cart-items/empty
// @desc    empty Cart
// @access  Private
router.post("/empty", auth, async (req, res) => {
  try {
    await CartItem.deleteMany({ user: req.user.id });
    return res.json({ success: true, deleted: true });
  } catch (err) {
    res.status(404).json({ msg: false });
  }
});

module.exports = router;
