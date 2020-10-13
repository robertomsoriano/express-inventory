const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ItemTransaction = require("../../models/ItemTransaction");
const Item = require("../../models/Item");
const CartItem = require("../../models/CartItem");
// @route   POST /item-checkout
// @desc    Process item-transactions
// @access  Private

router.post("/", auth, (req, res) => {
  // Checkout submission will log a trasaction
  let newTransaction = new ItemTransaction({
    transac_type: req.body.transaction.transac_type,
    transac_operator: req.body.transaction.transac_operator,
    // Don't required customer data for now
    transac_customer: req.body.transaction.transac_customer,
    transac_items: req.body.transaction.transac_items,
    sale_transac: req.body.transaction.sale_transac,
    transac_subtotal: req.body.transaction.transac_subtotal,
    transac_discount: req.body.transaction.transac_discount,
    transac_taxes: req.body.transaction.transac_taxes,
    transac_total: req.body.transaction.transac_total,
    amount_received: req.body.transaction.amount_received,
    transac_message: req.body.transaction.transac_message,
    transac_status: "reconciled",
    user: req.user.id
  });
  try {
    req.body.transaction.transac_items.map((itemProcessing) => {
      Item.findById(itemProcessing._id, (err, ItemToUpdate) => {
        ItemToUpdate.item_quantity =
          ItemToUpdate.item_quantity - itemProcessing.item_quantity;
        ItemToUpdate.save();
      });
    });
    newTransaction.save().then((trans) => res.json(trans));
    return;
  } catch (err) {
    return res.status(425).json({
      msg: "Transaction not valid. Are you ordering more books than available?"
    });
  }
});

// @route   PUT /item-checkout
// @desc    Revert item-transactions
// @access  Private

router.put("/revert/:invoice_number", auth, async (req, res) => {
  // Checkout submission will log a trasaction
  let transactionObj = await ItemTransaction.findOne({
    invoice_number: req.params.invoice_number
  });
  try {
    if (transactionObj.transac_status !== "reconciled") {
      throw new Error("Transaction is not valid");
    }
    // Re-stock Inventory
    transactionObj.transac_items.map((itemProcessing) => {
      Item.findById(itemProcessing._id, (err, ItemToUpdate) => {
        ItemToUpdate.item_quantity =
          ItemToUpdate.item_quantity + itemProcessing.item_quantity;
        ItemToUpdate.save();
      });
    });
    // Set transaction as voided and reverted
    transactionObj.transac_status = "voided";
    transactionObj.save().then((trans) => res.json(trans));
    return;
  } catch (err) {
    return res.status(425).json({
      msg: "Transaction reversal not completed."
    });
  }
});

// @route   POST api/item-checkout
// @desc    GET user all  Transactions
// @access  Private
router.get("/", (req, res) => {
  // ItemTransaction.find({ user: req.user.id })
  ItemTransaction.find()
    .sort({ invoice_number: -1 })
    .then((trans) => res.send(trans));
});

module.exports = router;
