const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Transaction = require("../../models/Transaction");
const Book = require("../../models/Book");

// @route   POST checkout
// @desc    POST transactions
// @access  Private

router.post("/", auth, (req, res) => {
  // Checkout submission will log a trasaction
  const newTransaction = new Transaction({
    seller: req.body.transaction.seller,
    assistant: req.body.transaction.assistant,
    // Don't required customer data for now
    customer: req.body.transaction.customer,
    items: req.body.transaction.items,
    sale: req.body.transaction.sale,
    subtotal: req.body.transaction.subtotal,
    discount: req.body.transaction.discount,
    taxes: req.body.transaction.taxes,
    total: req.body.transaction.total,
    amount_received: req.body.transaction.amount_received,
    message: req.body.transaction.message,
    user: req.user.id
  });
  try {
    // Check Inventory first
    req.body.transaction.booksToUpdate.map(item => {
      Book.findById(item.id, (err, book) => {
        book.quantity = book.quantity - item.quantity;
        book.expire_at = null;
        book.save();
      });
    });
    // If there are enough items in stock process transaction
    newTransaction.save().then(trans => res.json(trans));
    return;
  } catch (err) {
    
    return res.status(425).json({
      msg: "Transaction not valid. Are you ordering more books than available?"
    });
  }
});

// @route   POST checkout
// @desc    POST transactions
// @access  Public

router.post("/public", async (req, res) => {
  // Checkout submission will log a trasaction
  const newTransaction = new Transaction({
    seller: req.body.transaction.seller,
    assistant: req.body.transaction.assistant,
    // Don't required customer data for now
    customer: req.body.transaction.customer,
    items: req.body.transaction.items,
    sale: req.body.transaction.sale,
    subtotal: req.body.transaction.subtotal,
    discount: req.body.transaction.discount,
    taxes: req.body.transaction.taxes,
    total: req.body.transaction.total,
    amount_received: req.body.transaction.amount_received,
    message: req.body.transaction.message,
    user: "public"
  });
  try {
    // Check Inventory first
    req.body.transaction.booksToUpdate.map(item => {
      Book.findById(item.id, (err, book) => {
        book.quantity = book.quantity - item.quantity;
        book.expire_at = null;
        book.save();
      });
    });
    // If there are enough items in stock process transaction
    const completedTrans = await newTransaction
      .save()
      .then(trans => res.json(trans));
    // return completedTrans;
  } catch (err) {
    console.log(err)
    return res.status(425).json({
      msg: "Transaction not valid. Are you ordering more books than available?"
    });
  }
});

module.exports = router;
