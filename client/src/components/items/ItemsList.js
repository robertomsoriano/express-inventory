import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../../actions/itemsActions";
import { increaseQuantity } from "../../actions/cartItemsActions";
// Components
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Table
  // Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// import AddItem from "./AddItem";

import Swal from "sweetalert2";
import AddItem from "./AddItem";
import VehicleList from "../vehicles/VehicleList";
const ItemsList = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getItems());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // eslint-disable-next-line
  }, [state]);
  let items = state.items.items;
  let cart = props.cart ? props.cart : state.cartItems.cart
  const checkStock = (itemRequested) => {
    // if cart is empty, Return
    if (!cart.length) { return true }
    let itemInCart = cart.filter(item => item._id === itemRequested._id)
    if (itemInCart.length === 0) { return true }
    let inQuestion = items.filter(item => item._id === itemRequested._id)
    if ((itemInCart[0].item_quantity + 1) > inQuestion[0].item_quantity) {
      Swal.fire({
        title: 'Could not add more items',
        text: "There are not enough items in stock to complete your order",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        footer: '<a href="/items">Check inventory</a>'
      })
      return false
    }
    return true
  }
  return !items.length ? (
    <>
      <Container>
        <h2>You have no Items!</h2>
        <h6>Add a Items to your list.</h6>
      </Container>
    </>
  ) : (
      <>
        <VehicleList />
        {
          <Container style={{ marginTop: "5rem" }}>
            <h2>{`Available Parts & Services`}</h2>
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
                          <th></th>

                          <th>Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          {/* <th>Image</th> */}
                        </tr>
                      </thead>

                      {items.length > 0 &&
                        items.map((item) => (
                          <tbody
                            key={item._id}
                            bgcolor={item.item_quantity <= 0 ? "coral" : "white"}
                            style={{
                              backgroundColor: null
                            }}
                          >
                            <tr>
                              <th scope="row">
                                {state.auth.isAuthenticated && (
                                  <>
                                    <Link
                                      to={{
                                        pathname: `/item/edit/${item._id}`,
                                        state: { item }
                                      }}
                                    >
                                      <Button className="edit-btn" outline>
                                        View/Edit
                                    </Button>
                                    </Link>
                                    <Button
                                      className="edit-btn"
                                      outline
                                      onClick={() => {

                                        if (item.item_quantity <= 0) {
                                          Swal.fire({
                                            title: "item not available!",
                                            text: "Order more copies.",
                                            icon: "warning",
                                            footer:
                                              '<a href="/cart">Go to cart</a>'
                                          });
                                        } else if (checkStock(item)) {
                                          dispatch(increaseQuantity(item));
                                        }
                                      }}
                                    >
                                      Add to Cart
                                  </Button>
                                  </>
                                )}
                              </th>
                              <td>{item.item_name}</td>
                              <td>{item.item_desc}</td>
                              <td>{item.item_price}</td>
                              <td>{item.item_quantity}</td>
                              {/* <td>
                                                                <img
                                                                    src={`${item.pic}`}
                                                                    alt={item.name}
                                                                    width="100px"
                                                                    height="100px"
                                                                />
                                                            </td> */}
                            </tr>
                          </tbody>
                        ))}
                    </Table>
                  </ListGroupItem>
                </CSSTransition>
              </TransitionGroup>
            </ListGroup>
          </Container>
        }
        <AddItem />
      </>
    );
};

export default ItemsList;
