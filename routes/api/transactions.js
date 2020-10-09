const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Transaction = require("../../models/Transaction");

// @route   POST api/transactions
// @desc    GET user all  Transactions
// @access  Private
router.get("/", auth, (req, res) => {
  Transaction.find({ user: req.user.id })
    .sort({ invoice_number: -1 })
    .then(trans => res.send(trans));
});

// @route   POST api/transactions
// @desc    GET user all  Transactions
// @access  Public
router.get("/public", (req, res) => {
  Transaction.find({ user: "public" })
    .sort({ invoice_number: -1 })
    .then(trans => res.send(trans));
});

// @route   POST api/transactions
// @desc    GET user Transactions by invoice #
// @access  Private
router.post("/", auth, (req, res) => {
  if (!req.body.trans_id) {
    return res.send("Please provider trans_id param.");
  }
  Transaction.find({
    user: req.user.id,
    _id: req.body.trans_id
  })
    .sort({ invoice_number: -1 })
    .then(trans => res.send(trans));
});

// @route   POST api/transactions
// @desc    GET user Transactions by invoice #
// @access  Public
router.post("/public", (req, res) => {
  if (!req.body.trans_id) {
    return res.send("Please provider trans_id param.");
  }
  Transaction.find({
    user: "public",
    _id: req.body.trans_id
  })
    .sort({ invoice_number: -1 })
    .then(trans => res.send(trans));
});
module.exports = router;
