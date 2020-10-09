const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Book Model
const Book = require("../../models/Book");
//Cart Model (delete form cart as well)
const Cart = require("../../models/Cart");
// @route   GET api/books
// @desc    Get all books
// @access  Public
router.get("/", (req, res) => {
  console.log(`Books GET Req at ${Date()}`);
  Book.find()
    .sort({ name: 1 })
    .then(books => res.send(books));
});
// @route   GET api/books/:id
// @desc    Get single books
// @access  Public
router.get("/:id", (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err)
      return res
        .status(404)
        .json({ msg: "Request Not Valid, Book Not Found." });
    res.json(book);
  });
});
// @route   POST api/books/user/books
// @desc    GET  user's books
// @access  Private
router.post("/user/:userId", auth, (req, res) => {
  Book.find((err, books) => {
    if (err)
      return res
        .status(404)
        .json({ msg: "Request Not Valid, Books Not Found." });
    res.json(books);
  });
});

// @route   POST api/books
// @desc    POST to books
// @access  Private
router.post("/", auth, (req, res) => {
  if (
    !req.body.book.name ||
    !req.body.book.author ||
    !req.body.book.price ||
    !req.body.book.quantity
  ) {
    return res
      .status(400)
      .json({ msg: "Book was not saved. Please enter all required fields." });
  }
  const newBook = new Book({
    name: req.body.book.name,
    subtitle: req.body.book.subtitle,
    author: req.body.book.author,
    description: req.body.book.description,
    price: req.body.book.price,
    sale_price: req.body.book.sale_price,
    disc_price: req.body.book.disc_price,
    quantity: req.body.book.quantity,
    pic: req.body.book.pic,
    user: req.body.book.user
  });
  try {
    newBook.save().then(book => res.json(book));
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "Book was not saved. Please enter all required fields." });
  }
});

// @route   PUT api/books/:id
// @desc    PUT to books
// @access  Private
router.put("/:id", auth, (req, res) => {
  let {
    name,
    subtitle,
    author,
    description,
    price,
    // sale_price,
    quantity,
    pic
  } = req.body.book;
  if (
    !name ||
    !price ||
    quantity === undefined ||
    !author ||
    !pic ||
    !subtitle ||
    !description
  ) {
    return res
      .status(400)
      .json({ msg: "Book was not saved. Please enter all required fields." });
  }
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      return res
        .status(400)
        .json({ msg: "Book was not saved. Please enter all required fields." });
    }
    (book.name = req.body.book.name),
      (book.subtitle = req.body.book.subtitle),
      (book.author = req.body.book.author),
      (book.description = req.body.book.description),
      (book.price = req.body.book.price),
      (book.sale_price = req.body.book.sale_price),
      (book.disc_price = req.body.book.disc_price),
      (book.quantity = req.body.book.quantity),
      (book.pic = req.body.book.pic);

    book.save();
    res.json(book);
  });
});

// @route   DELELTE api/books
// @desc    DELETE all books
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Book.findById(req.params.id)
    .then(book => book.remove())
    .then(() => {
      Cart.findById(req.params.id, (err, book) => {
        if (book) {
          book.remove();
        }
        if (err) {
          console.log(err);
        }
      });
    })
    .then(() => res.json({ success: true, deleted: true }))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/books
// @desc    POST to books
// @access  Private
router.post("/bulk", (req, res) => {
  // try {
  for (let i = 0; i < req.body.books.length; i++) {
    if (
      !req.body.books[i].name ||
      !req.body.books[i].author ||
      !req.body.books[i].price ||
      req.body.books[i].quantity == undefined
    ) {
      return res.status(400).json({
        msg: "Book was not saved. Please enter all required fields."
      });
    }

    // return res.send(req.body.books[i]);
  }
  Book.insertMany(req.body.books, (err, result) => {
    if (err) {
      return res.status(400).json({
        msg: "Books were not saved. Please enter all required fields."
      });
    }
  });
  // newBook.save().then(book => res.json(book));
  // } catch (err) {
  //   return res
  //     .status(400)
  //     .json({ msg: "Book was not saved. Please enter all required fields." });
  // }
});

module.exports = router;
