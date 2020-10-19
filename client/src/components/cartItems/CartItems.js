import React, { useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
// Redux
import { useSelector, useDispatch } from "react-redux";
//Components
import { Container, ListGroup, ListGroupItem, Button, Table, Alert } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Swal from "sweetalert2";
import { increaseQuantity, decreaseQuantity, deleteCartVehicle, cartTotal } from '../../actions/cartItemsActions';
import { clearErrors } from "../../actions/errorActions";
import { currentCartTotal } from '../../hooks/currentCartAmount';
const CartItems = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const cart = useSelector(state => state.cartItems)
    const cartItems = cart.cart
    const vehicleInCart = cart.vehicle ? cart.vehicle : null
    useEffect(() => {
        dispatch(clearErrors())
    }, [cart]);
    useEffect(() => {
        dispatch(clearErrors())
        // eslint-disable-next-line
    }, [state.errors]);
    console.log(cart)
    if (!cartItems || !vehicleInCart) {
        return (
            <>
                <Container>
                    <h2>You have no Items!</h2>
                    <h6>Add a Items to your list.</h6>
                </Container>
            </>
        )
    }
    return (
        <>

            <Container style={{ marginTop: "5rem" }}>
                {state.error.msg !== null && (
                    <Alert color="danger">{state.error.msg.msg}</Alert>
                )}
                <h2>Your Current Transaction</h2>
                {/* Cart Vehicle */}
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        <CSSTransition timeout={0} classNames="fade">
                            <ListGroupItem>
                                <h4>Vehicle</h4>
                                <hr />
                                <Table
                                    hover
                                    responsive
                                    borderless
                                    style={{ overflowX: "auto" }}
                                >
                                    <thead>
                                        <tr>

                                            <th></th>
                                            <th><img
                                                src={`${vehicleInCart.vehicle_image}`}
                                                alt={vehicleInCart.vehicle_name}
                                                width="100px"
                                                height="100px"
                                            /></th>
                                            <th>Vehicle Plate</th>
                                            <th>Vehicle Name</th>
                                            <th>Vehicle Mileage</th>

                                        </tr>
                                    </thead>
                                    <tbody
                                        key={vehicleInCart._id}
                                        style={{
                                            backgroundColor: null
                                        }}
                                    >
                                        <tr>
                                            <th scope="row" />
                                            <td className={`d-flex flex-column`} style={{ width: '100px' }}>

                                                <>
                                                    <Button
                                                        className="remove-btn"
                                                        color="danger"
                                                        size="sm"
                                                        outline
                                                        style={{ fontSize: "11px", width: '100px' }}
                                                        onClick={() => { dispatch(deleteCartVehicle()) }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </>
                                            </td>
                                            <td >{vehicleInCart.vehicle_number}</td>
                                            <td>{vehicleInCart.vehicle_name}</td>
                                            <td>{vehicleInCart.vehicle_mileage}</td>
                                        </tr>
                                    </tbody>
                                    {/* ))} */}
                                </Table>
                            </ListGroupItem>
                        </CSSTransition>
                    </TransitionGroup>
                </ListGroup>
                {/* End Cart Vehicle */}
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        <CSSTransition timeout={0} classNames="fade">
                            <ListGroupItem>
                                <h4>{`Parts & Services`}</h4>
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
                                    {cartItems.map(item => (
                                        <tbody key={item._id}>
                                            <tr>
                                                <th scope="row" />
                                                <td>
                                                    <img
                                                        src={`${item.item_image}`}
                                                        alt={item.item_name}
                                                        width="100px"
                                                        height="100px"
                                                    />
                                                </td>
                                                <td>{item.item_name}</td>

                                                <td>
                                                    <Link
                                                        to={{
                                                            pathname: `/cart`,
                                                            state: { item }
                                                        }}
                                                    >
                                                        <Button
                                                            className="edit-btn"
                                                            size="sm"
                                                            outline
                                                            onClick={e => dispatch(decreaseQuantity(item))}
                                                            style={{ fontSize: "10px", margin: "4px" }}
                                                        >
                                                            -
                              </Button>
                                                    </Link>
                                                    {item.item_quantity}
                                                    <Link
                                                        to={{
                                                            pathname: `/cart`,
                                                            state: { item }
                                                        }}
                                                    >
                                                        <Button
                                                            className="edit-btn"
                                                            outline
                                                            size="sm"
                                                            onClick={() => dispatch(increaseQuantity(item))}
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
                                                        onClick={e => { return }}
                                                        style={{ fontSize: "11px", margin: "2px" }}
                                                    >
                                                        &times; remove
                            </Button>
                                                </td>
                                                <td>${item.item_price}</td>
                                                <td>${(item.item_price * item.item_quantity).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </Table>
                            </ListGroupItem>
                        </CSSTransition>
                    </TransitionGroup>
                </ListGroup>
                <ListGroupItem style={{ float: "right" }}>
                    Subtotal: <strong> ${currentCartTotal(cartItems)}</strong> <br />
                    {/* Subtotal: <strong> $CartTotal</strong> <br /> */}
                    <hr />
                    <Link
                        to={{
                            pathname: `/`,
                            // state: { item }
                        }}
                    >
                        <Button style={{ textDecoration: "none" }}>
                            Proceed to Checkout
            </Button>
                    </Link>
                </ListGroupItem>
                <ListGroupItem style={{ float: "left" }}>
                    <Link to={"/"}>
                        <Button>Go back Home</Button>
                    </Link>
                </ListGroupItem>
            </Container>
        </>
    )
}
export default withRouter(CartItems)