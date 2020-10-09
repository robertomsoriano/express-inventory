import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Table,
  // Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getBooks } from "../../actions/bookActions";
import AddBookModal from "./AddBookModal";
import { increaseQuantity } from "../../actions/cartActions";
import Swal from "sweetalert2";
// import AddItems from "./AddItems";

const BooksList = props => {
  const state = useSelector(state => state);
  useEffect(() => {
    props.getBooks();
    // eslint-disable-next-line
  }, []);
  let books = state.book.books;
  return !books.length ? ( //books.length === 0 ||
    <>
      <Container>
        <h2>You have no books!</h2>
        <h6>Add a book to your list.</h6>
      </Container>
    </>
  ) : (
    <>
      {!props.loading && (
        <Container style={{ marginTop: "5rem" }}>
          {/* {authed && <AddItems className="add-item" />} */}
          <h2>Available Books</h2>
          <ListGroup>
            <TransitionGroup className="shopping-list">
              <CSSTransition timeout={0} classNames="fade">
                <ListGroupItem>
                  <Table
                    hover
                    responsive
                    borderless
                    style={{ overflowX: "auto" }}
                  >
                    <thead>
                      <tr>
                        <th>#</th>

                        <th>Title</th>
                        <th>Subtitle</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
                      </tr>
                    </thead>

                    {books.length > 0 &&
                      books.map(book => (
                        <tbody
                          key={book._id}
                          bgcolor={book.quantity <= 0 ? "coral" : "white"}
                          style={{
                            backgroundColor: null
                          }}
                        >
                          <tr>
                            <th scope="row">
                              {props.isAuthenticated && (
                                <>
                                  <Link
                                    to={{
                                      pathname: `/edit/${book._id}`,
                                      state: { book }
                                    }}
                                  >
                                    <Button className="edit-btn" outline>
                                      View/Edit
                                    </Button>
                                  </Link>

                                  {/* <Link
                                  to={{
                                    pathname: `/cart`,
                                    state: { book }
                                  }}
                                > */}
                                  <Button
                                    className="edit-btn"
                                    outline
                                    onClick={() => {
                                      if (book.quantity <= 0) {
                                        Swal.fire({
                                          title:'Book not available!',
                                          text:'Order more copies.',
                                          type:'warning',
                                          footer:'<a href="/cart">Go to cart</a>'})
                                      } else {
                                        props.increaseQuantity(book);
                                      }
                                    }}
                                  >
                                    Add to Cart
                                  </Button>
                                  {/* </Link> */}
                                </>
                              )}
                            </th>
                            <td>{book.name}</td>
                            <td>{book.subtitle}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>{book.price}</td>
                            <td>{book.quantity}</td>
                            <td>
                              <img
                                src={`${book.pic}`}
                                alt={book.name}
                                width="100px"
                                height="100px"
                              />
                            </td>
                          </tr>
                        </tbody>
                      ))}
                  </Table>
                </ListGroupItem>
              </CSSTransition>
            </TransitionGroup>
          </ListGroup>
        </Container>
      )}
      <AddBookModal />
    </>
  );
};

const mapStateToProps = state => ({
  book: state.book,
  loading: state.book.loading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getBooks, increaseQuantity }
)(BooksList);
