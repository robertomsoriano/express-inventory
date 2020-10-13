const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   GET api/items/:type
// @desc    Get All Items by type
// @access  Public
router.get('/type/:type', (req, res) => {
  Item.find({ item_type: req.params.type })
    .sort({ date_added: 1 })
    .then(items => res.json(items));
});

// @route   GET api/items/:id
// @desc    Get single item
// @access  Public
router.get("/single/:id", (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err)
      return res
        .status(404)
        .json({ msg: "Request Not Valid, Item Not Found." });
    res.json(item);
  });
});


// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
  try {
    const { item_type,
      item_name,
      item_number,
      item_price,
      item_quantity,
      item_desc,
      item_image } = req.body;
    const newItem = new Item({
      item_type,
      item_name,
      item_number,
      item_price,
      item_quantity: parseInt(item_quantity),
      item_desc,
      item_image,
      user: req.user.id
    });

    newItem.save().then(item => res.json(item)).catch(err => res.status(404).json({ msg: "Item could not be added." }))
  } catch (err) {
    return res.status(404).json({ msg: "Item could not be added. \n Make sure price and quantity are numbers." });
  }
});


// @route   PUT api/items/edit/:id
// @desc    PUT to items
// @access  Private
router.put("/edit/:id", auth, (req, res) => {
  let {
    item_type,
    item_name,
    item_number,
    item_price,
    item_quantity,
    item_desc,
    item_image } = req.body.item;

  if (
    !item_type ||
    !item_name ||
    !item_price ||
    !item_quantity ||
    typeof item_quantity !== "number" ||
    item_quantity === undefined ||
    !item_image
    // reqiure item_number, image or desc? TO-DO!!
  ) {
    return res
      .status(400)
      .json({ msg: "Item was not saved. Please enter all required fields." });
  }

  Item.findById(req.params.id, (err, item) => {
    if (err || item === null) {
      return res
        .status(400)
        .json({ msg: "Item was not saved. Please enter all required fields and verify you are using a valid item ID." });
    }
    (item.item_type = item_type),
      (item.item_name = item_name),
      (item.item_number = item_number),
      (item.item_price = item_price),
      (item.item_quantity = parseInt(item_quantity)),
      (item.item_desc = item_desc),
      (item.item_image = item_image)

    item.save().then(item => res.json(item)).catch(err => res.status(404).json({ msg: "Item could not be added." }))
    // res.json(item);
  }).catch(err => res.status(404).json({ msg: "Item could not be added." }))
});


// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/delete/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, msg: "Are you using a valid item ID?" }));
});

module.exports = router;



