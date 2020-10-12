const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ItemTransaction = require("../../models/ItemTransaction");
const Item = require("../../models/Item");

// @route   POST /item-checkout
// @desc    Process item-transactions
// @access  Private

router.post("/", auth, (req, res) => {
    // Checkout submission will log a trasaction
    const newTransaction = new Transaction({
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
        user: req.user.id
    });
    try {
        // Check Inventory first
        req.body.transaction.itemsToUpdate.map(itemProcessing => {
            Item.findById(itemProcessing.id, (err, ItemToUpdate) => {
                ItemToUpdate.item_quantity = ItemToUpdate.item_quantity - itemProcessing.item_quantity;
                ItemToUpdate.save();
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


module.exports = router;
