const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Cart Model
const Cart = require("../../models/Cart");

// @route   GET api/cart
// @desc    Get all cart
// @access  Private
router.get("/", auth, (req, res) => {
  console.log(`Cart GET Req at ${Date()}`);
  try {
    Cart.find({ user: req.user.id })
      .sort({ date_added: -1 })
      .then(books => res.send(books));
  } catch (e) {
    return res.status(400).json({ msg: "User's cart is empty" });
  }
});

// @route   PUT api/cart
// @desc    Add item to cart (or inc quantity)
// @access  Private
router.put("/", auth, async (req, res) => {
  // If item is already in the Cart, quantity will increase.
  //Else, item will be added.
  try {
    await Cart.findOneAndUpdate(
      { _id: req.body.book.book_id, user: req.user.id },
      {
        $inc: { quantity: 1 },
        name: req.body.book.name,
        subtitle: req.body.book.subtitle,
        author: req.body.book.author,
        description: req.body.book.description,
        price: req.body.book.price,
        sale_price: req.body.book.sale_price,
        pic: req.body.book.pic
      },
      {
        new: true,
        upsert: true
      }
    );
    return Cart.find({ user: req.user.id }, (err, cart) => {
      res.send(cart);
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: false });
  }
});

// @route   PUT api/cart
// @desc    decrease item in  cart
// @access  Private
router.put("/decrease", auth, async (req, res) => {
  // If item is already in the Cart, quantity will increase.
  //Else, item will be added.
  try {
    await Cart.findOneAndUpdate(
      { _id: req.body.book.book_id, user: req.user.id },
      {
        $inc: { quantity: -1 },
        name: req.body.book.name,
        subtitle: req.body.book.subtitle,
        author: req.body.book.author,
        description: req.body.book.description,
        price: req.body.book.price,
        sale_price: req.body.book.sale_price,
        pic: req.body.book.pic
      },
      {
        new: true,
        upsert: true
      }
    );
    return Cart.find({ user: req.user.id }, (err, cart) => {
      res.send(cart);
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: false });
  }
});

// @route   DELELTE api/cart
// @desc    remove item from cart
// @access  Private
router.put("/delete-item", auth, async (req, res) => {
  try {
    await Cart.findById(req.body.book.book_id).then(book =>
      book.remove().then(() =>
        Cart.find({ user: req.user.id }, (err, cart) => {
          res.send(cart);
        })
      )
    );
    // return Cart.find({ user: req.user.id }, (err, cart) => {
    //   res.send(cart);
    // });
  } catch (err) {
    res.status(404).json({ msg: false });
  }
});

// @route   DELELTE api/cart/empty
// @desc    empty Cart
// @access  Private
router.post("/empty", auth, async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user.id });
    return res.json({ success: true, deleted: true });
  } catch (err) {
    res.status(404).json({ msg: false });
  }
});

module.exports = router;
