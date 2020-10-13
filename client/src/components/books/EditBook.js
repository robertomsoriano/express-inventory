import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
import axios from "axios";
import { ListGroupItem, Button, Input, Alert } from "reactstrap";
import { deleteBook, updateBook } from "../../actions/bookActions";
import Swal from "sweetalert2";

const EditBook = props => {
  const bookId = props.match.params.id;
  const [book, setBook] = useState({
    book: {
      name: "l",
      subtitle: "l",
      author: "l",
      description: "l",
      price: "l",
      quantity: "l",
      pic: "l"
    }
  });
  const [newName, setNewName] = useState(book.name);
  const [newSubtitle, setNewSubtitle] = useState(book.subtitle);
  const [newAuthor, setNewAuthor] = useState(book.author);
  const [newDescription, setNewDescription] = useState(book.description);
  const [newPrice, setNewPrice] = useState(book.price);
  const [newSalePrice, setNewSalePrice] = useState(book.price);
  const [newDiscPrice, setNewDiscPrice] = useState(book.price);
  const [newQuantity, setNewQuantity] = useState(book.quantity);
  const [newPic, setNewPic] = useState(book.pic);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const result = await axios(`/api/books/${bookId}`);
      if (result.data !== null) {
        await setBook(result.data);
        await setNewName(book.name);
        await setNewSubtitle(book.subtitle);
        await setNewAuthor(book.author);
        await setNewDescription(book.description);
        await setNewPrice(book.price);
        await setNewSalePrice(book.sale_price);
        await setNewDiscPrice(book.disc_price);
        await setNewQuantity(book.quantity);
        await setNewPic(book.pic);
      }
    }
    fetchData();
  }, [
      book._id,
      book.author,
      book.description,
      book.name,
      book.pic,
      book.price,
      book.sale_price,
      book.disc_price,
      book.quantity,
      book.subtitle,
      bookId,
      props.error
    ]);

  const handleUpdate = (e, bookId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this item?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        props.updateBook({
          id: bookId,
          book: {
            book: {
              name: newName,
              subtitle: newSubtitle,
              author: newAuthor,
              description: newDescription,
              price: newPrice,
              sale_price: newSalePrice,
              disc_price: newDiscPrice,
              quantity: newQuantity,
              pic: newPic
            }
          }
        });
      }
    })

  };
  const handleDelete = (e, bookId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete item from cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Please contact admin',
          text: "Deleting books is not allowed.",
          icon: 'error',
          confirmButtonColor: '#3085d6'
        })
        // props.deleteBook(bookId)
        // props.history.push('/books')
      }
    })
  };

  //!props.location.state
  return book.name === undefined ? (
    <>
      <div>No Book to edit...</div>
      <div>
        <Button color="primary" outline href="/">
          Go Back to Book List
        </Button>
      </div>
    </>
  ) : (
      <>
        {props.error.msg.msg && (
          <Alert color="danger">{props.error.msg.msg}</Alert>
        )}
        <div className="edit-container" style={{ margin: "3rem" }}>
          <div className="form-group edit-container-form">
            <br />
            <br />
            <h2 className="edit-header">{newName}</h2>
            <ListGroupItem>
              <h5>Title</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book title"
                value={`${newName}`}
                onChange={e => setNewName(e.target.value)}
              />
              <h5>Subtitle</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book subtitle"
                value={`${newSubtitle}`}
                onChange={e => setNewSubtitle(e.target.value)}
              />
              <h5>Author</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book author"
                value={`${newAuthor}`}
                onChange={e => setNewAuthor(e.target.value)}
              />
              <h5>Description</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book description"
                value={`${newDescription}`}
                onChange={e => setNewDescription(e.target.value)}
              />
              <h5>Price</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book price"
                type="text"
                value={`${newPrice}`}
                onChange={e => setNewPrice(e.target.value)}
              />
              <h5>Sale Price</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book sale price"
                type="text"
                value={`${newSalePrice}`}
                onChange={e => setNewSalePrice(e.target.value)}
              />
              <h5>Disc Price</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book Disc price"
                type="text"
                value={`${newDiscPrice}`}
                onChange={e => setNewDiscPrice(e.target.value)}
              />
              <h5>Quantity</h5>
              <button
                className="minus btn btn-info outline"
                onClick={e => setNewQuantity(newQuantity => newQuantity - 1)}
              >
                -
            </button>
              <input type="text" value={`${newQuantity}`} readOnly />
              <button
                className="plus btn btn-info outline"
                onClick={e => setNewQuantity(newQuantity => newQuantity + 1)}
              >
                +
            </button>
              <h5>Image</h5>
              <Input
                className=" form-control col-xs-2"
                placeholder="update book image"
                value={`${newPic}`}
                onChange={e => setNewPic(e.target.value)}
              />
              <br />
              <Button
                color="secondary"
                outline
                size="sm"
                onClick={e => handleUpdate(e, bookId)}
              >
                Update Book
            </Button>
              <Button
                color="secondary"
                outline
                size="sm"
                onClick={e => handleDelete(e, bookId)}
              >
                Delete Book
            </Button>
            </ListGroupItem>
          </div>
          <div className="edit-container-img">
            <img src={`${newPic}`} alt={newName} width="300px" height="300px" />
            <div className="edit-container-link" style={{ marginTop: "1rem" }}>
              <Button color="dark" href="/books" block>
                Go Back to Book List
            </Button>
            </div>
          </div>
        </div>
      </>
    );
};

const mapStateToProps = state => ({
  loading: state.book.books.loading,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(
  mapStateToProps,
  { deleteBook, updateBook }
)(withRouter(EditBook));
