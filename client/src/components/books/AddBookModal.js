import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getBooks, addBook } from "../../actions/bookActions";
import { clearErrors } from "../../actions/errorActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

const AddBookModal = props => {
  const state = useSelector(state => state);
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.auth.user);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(modal => !modal);
  };

  const [newName, setNewName] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newSalePrice, setNewSalePrice] = useState("");
  const [newDiscPrice, setNewDiscPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newPic, setNewPic] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    clearErrors();
    props.addBook({
      book: {
        name: newName,
        subtitle: newSubtitle,
        author: newAuthor,
        description: newDescription,
        price: newPrice,
        sale_price: newSalePrice,
        disc_price: newDiscPrice,
        quantity: newQuantity,
        pic: newPic,
        user: user._id
      }
    });
  };
  useEffect(() => {
    setNewName("");
    setNewSubtitle("");
    setNewAuthor("");
    setNewDescription("");
    setNewPrice("");
    setNewSalePrice("");
    setNewQuantity("");
    setNewPic("");
    setModal(false);
    // eslint-disable-next-line
  }, [state.book.books.length]);
  useEffect(() => {
    clearErrors();
    // eslint-disable-next-line
  }, [state.errors, props.error]);

  return (
    <>
      {auth.isAuthenticated ? (
        <Button
          className="btn-block"
          color="dark"
          style={{ marginBottom: "2rem", padding: ".6rem" }}
          onClick={() => toggle()}
        >
          Add New Book
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage books</h4>
      )}

      <Modal isOpen={modal} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Add To Books List</ModalHeader>
        <ModalBody>
          {props.error.msg.msg ? (
            <Alert color="danger">{props.error.msg.msg}</Alert>
          ) : null}
          <Form
            onSubmit={e => {
              onSubmit(e);
            }}
          >
            <FormGroup>
              <Label for="book">Book</Label>
              <Input
                type="text"
                name="name"
                id="book"
                value={newName}
                placeholder="Add title"
                onChange={e => setNewName(e.target.value)}
                required
              />
              <Label for="subtitle">Subtitle</Label>
              <Input
                type="text"
                name="subtitle"
                id="subtitle"
                value={newSubtitle}
                placeholder="Add subtitle"
                onChange={e => setNewSubtitle(e.target.value)}
              />
              <Label for="author">author</Label>
              <Input
                type="text"
                name="author"
                id="author"
                value={newAuthor}
                placeholder="Add author"
                onChange={e => setNewAuthor(e.target.value)}
                required
              />
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={newDescription}
                placeholder="Add description"
                onChange={e => setNewDescription(e.target.value)}
              />
              <Label for="price">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                value={newPrice}
                placeholder="Add price"
                onChange={e => setNewPrice(e.target.value)}
                required
              />
              <Label for="saleprice">Sale Price</Label>
              <Input
                type="text"
                name="saleprice"
                id="saleprice"
                value={newSalePrice}
                placeholder="Add sale price"
                onChange={e => setNewSalePrice(e.target.value)}
                required
              />
              <Label for="discprice">Disc. Price</Label>
              <Input
                type="text"
                name="discprice"
                id="discprice"
                value={newDiscPrice}
                placeholder="Add Disc price"
                onChange={e => setNewDiscPrice(e.target.value)}
                required
              />
              <Label for="quantity">Quantity</Label>
              <Input
                type="text"
                name="quantity"
                id="quantity"
                value={newQuantity}
                placeholder="Add quantity"
                onChange={e => setNewQuantity(e.target.value)}
                required
              />
              <Label for="pic">Picture</Label>
              <Input
                type="text"
                name="pic"
                id="pic"
                value={newPic}
                placeholder="Add picture url"
                onChange={e => setNewPic(e.target.value)}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Book
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  book: state.book,
  loading: state.book.books.loading,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getBooks, addBook, clearErrors }
)(AddBookModal);
