const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// CartItem Model
const CartItem = require("../../models/CartItem");

// @route   GET api/cart-items
// @desc    Get all cartItems
// @access  Private
router.get("/", auth, (req, res) => {
    console.log(`CartItem GET Req at ${Date()}`);
    try {
        CartItem.find({ user: req.user.id })
            .sort({ date_added: -1 })
            .then(items => res.send(items));
    } catch (e) {
        return res.status(400).json({ msg: "User's cart is empty" });
    }
});



// @route   PUT api/cart-items/add
// @desc    Add item to cart (or inc quantity)
// @access  Private
router.put("/add", auth, async (req, res) => {
    // If item is already in the Cart, quantity will increase.
    //Else, item will be added.
    try {
        await CartItem.findOneAndUpdate(
            { _id: req.body.item.item_id, user: req.user.id },
            {
                $inc: { item_quantity: 1 },
                item_name: req.body.item.item_name,
                item_price: req.body.item.item_price,
                item_type: req.body.item.item_type,
                item_image: req.body.item.item_image,
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


// @route   PUT api/cart-items/decrease
// @desc    Decrease item to cart (or dec quantity)
// @access  Private
router.put("/decrease", auth, async (req, res) => {
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
                item_image: req.body.item.item_image,
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
        await CartItem.findById(req.body.item.item_id).then(item =>
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