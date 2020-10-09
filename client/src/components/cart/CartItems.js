import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  setCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem
} from "../../actions/cartActions";
import {getBooks} from '../../actions/bookActions'
import Swal from "sweetalert2";

/*
cart total: CartTotal()
 */

const CartItems = props => {
  const cart = useSelector(state => state.cart);
  const books = useSelector(state => state.cart.cart);

  // Set cart total
  const CartTotal = () => {
    if (!books) {
      return 1;
    } else if (books.length > 0) {
      let quant = books.map(book => book.item_total);
      quant = quant.reduce((acc, curr) => acc + curr);
      let result = Math.round(quant * 100) / 100;
      return result;
    } else {
      return 1;
    }
  };
  useEffect(() => {
    props.getBooks()
    // eslint-disable-next-line
  }, []);

  const handleDelete = (e, book) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove item from cart?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        props.deleteItem(book);
      }
    })
  };

  return !cart || cart.length === 0 ? (
    <>
      <Container>
        <h2>Your Shopping Cart is empty!</h2>
        <h6>Add a book to your list.</h6>

        <Link to={"/"}>
          <Button>Go to Dashboard</Button>
        </Link>
      </Container>
    </>
  ) : (
    <>
      <Container style={{ marginTop: "5rem" }}>
        <h2>Your Shopping Cart</h2>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            <CSSTransition timeout={0} classNames="fade">
              <ListGroupItem>
                <h4>Cart Items</h4>
                <hr />
                <Table
                  hover
                  responsive
                  borderless
                  style={{ overflowX: "auto" }}
                >
                  <thead>
                    <tr>
                      <th />
                      <th />
                      <th />
                      <th>Quantity</th>
                      <th>Item Price</th>
                      <th>Item Total</th>
                    </tr>
                  </thead>
                  {books.length > 0 &&
                    books.map(book => (
                      <tbody key={book._id}>
                        <tr>
                          <th scope="row" />
                          <td>
                            <img
                              src={`${book.pic}`}
                              alt={book.name}
                              width="100px"
                              height="100px"
                            />
                          </td>
                          <td>{book.name}</td>

                          <td>
                            <Link
                              to={{
                                pathname: `/cart`,
                                state: { book }
                              }}
                            >
                              <Button
                                className="edit-btn"
                                size="sm"
                                outline
                                onClick={e => {
                                  if (book.quantity === 1) {
                                    handleDelete(e, book);
                                    return;
                                  }
                                  props.decreaseQuantity(book);
                                  // window.location.reload();
                                }}
                                style={{ fontSize: "10px", margin: "4px" }}
                              >
                                -
                              </Button>
                            </Link>
                            {book.quantity}
                            <Link
                              to={{
                                pathname: `/cart`,
                                state: { book }
                              }}
                            >
                              <Button
                                className="edit-btn"
                                outline
                                size="sm"
                                onClick={() => {
                                  let inQuestion = props.stock.books.filter(item => item._id===book._id)
                                  if((book.quantity + 1) > inQuestion[0].quantity){
                                    return Swal.fire({
                                      title: 'Could not add more books',
                                      text: "There are not enough books in stock to complete your order",
                                      type: 'error',
                                      confirmButtonColor: '#3085d6',
                                      footer: '<a href="/books">Check inventory</a>'
                                    })
                                  }
                                  else{props.increaseQuantity(book);}
                                }}
                                style={{ fontSize: "10px", margin: "4px" }}
                              >
                                +
                              </Button>
                            </Link>
                            <br />
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              outline
                              onClick={e => handleDelete(e, book)}
                              style={{ fontSize: "11px", margin: "2px" }}
                            >
                              &times; remove
                            </Button>
                          </td>
                          <td>${book.price}</td>
                          <td>${(book.price * book.quantity).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </ListGroupItem>
            </CSSTransition>
          </TransitionGroup>
        </ListGroup>
        <ListGroupItem style={{ float: "right" }}>
          Subtotal: <strong> ${CartTotal()}</strong> <br />
          {/* Subtotal: <strong> $CartTotal</strong> <br /> */}
          <hr />
          <Link
            to={{
              pathname: `/checkout`,
              state: { books }
            }}
          >
            <Button style={{ textDecoration: "none" }}>
              Proceed to Checkout
            </Button>
          </Link>
        </ListGroupItem>
        <ListGroupItem style={{ float: "left" }}>
          <Link to={"/books"}>
            <Button>Click here to keep shopping</Button>
          </Link>
        </ListGroupItem>
      </Container>
    </>
  );
};
const mapStateToProps = state => ({
  cart: state.cart,
  stock: state.book,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { setCart, increaseQuantity, decreaseQuantity, deleteItem, getBooks }
)(CartItems);
