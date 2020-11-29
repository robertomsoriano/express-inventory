import React, { useEffect, useState } from 'react'
import { withRouter, Link, useHistory } from 'react-router-dom'
// Redux
import { useSelector, useDispatch } from "react-redux";
//Components
import {
    Button,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    ListGroupItem,
    Table,
    ButtonGroup

    //   Alert
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Checkbox, Segment } from 'semantic-ui-react'
import Swal from "sweetalert2";
import { increaseQuantity, decreaseQuantity, deleteCartVehicle, cartTotal } from '../../actions/cartItemsActions';
import { clearErrors } from "../../actions/errorActions";
import { currentCartTotal } from '../../hooks/currentCartAmount';
import useForm from '../../hooks/useForm';
import { postTransaction } from '../../actions/checkoutActions';

const CheckoutTransac = (props) => {
    let history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const cart = useSelector(state => state.cartItems)
    const cartItems = cart.cart
    const vehicleInCart = cart.vehicle ? cart.vehicle : null
    // Transaction State
    const [newType, setNewType] = useState('internal');
    const [applySale, setApplySale] = useState(false)
    const [discount, setDiscount] = useState(0)

    //Apply a discount
    const applyDiscount = (total, percent = 0) => {
        if (newType === "internal") {
            setDiscount(0)
            return
        }
        let discounted = (total * (percent / 100))
        setDiscount(discounted)
        return
    }
    // Calculate Taxes
    const calcTaxes = (subtotal, taxRate = 0.0625) => {
        if (newType === "internal") { return 0 }
        if (applySale) {
            return Math.round((subtotal - discount) * taxRate * 100) / 100
        } else {
            return Math.round(subtotal * taxRate * 100) / 100
        }

    }

    const [user, handleChange] = useForm({
        name: "",
        phone: "",
        email: "",
        operator: "",
        type: "",
        amountReceived: "",
        message: "",
        percentage: 0
    });


    useEffect(() => {

        // eslint-disable-next-line
    }, [newType]);

    // Post Transaction
    const onSubmit = (e, newType, user, vehicleInCart, cartItems, subtotal, applySale = false, applyDiscount = 0, calcTaxes = 0, grandTotal = 0) => {
        e.preventDefault();
        // Set Transaction object
        const sendTrans = async () => {
            if (!currentCartTotal(cartItems)) {
                Swal.fire(
                    "No customer information",
                    "Please enter all the customer's info.",
                    'error'
                )
                return;
            } else {
                try {
                    if (newType === "internal") {
                        await dispatch(postTransaction({
                            transaction: {
                                transac_type: newType,
                                transac_operator: user.operator,
                                transac_customer: {},
                                transac_vehicle: vehicleInCart,
                                transac_items: cartItems,
                                sale_transac: applySale,
                                transac_subtotal: subtotal,
                                transac_discount: 0,
                                transac_taxes: 0,
                                transac_total: subtotal,
                                amount_received: 0,
                                transac_message: user.message,
                            }
                        })
                        )
                    }
                    else if (newType === "external") {
                        await dispatch(postTransaction({
                            transaction: {
                                transac_type: newType,
                                transac_operator: user.operator,
                                transac_customer: { name: user.name, phone: user.phone, email: user.email },
                                transac_vehicle: vehicleInCart,
                                transac_items: cartItems,
                                sale_transac: applySale,
                                transac_subtotal: subtotal,
                                transac_discount: discount,
                                transac_taxes: calcTaxes,
                                transac_total: grandTotal,
                                amount_received: user.amountReceived,
                                transac_message: user.message,
                            }
                        })
                        )
                    }
                    window.location.replace(`/dashboard`)
                } catch (err) {
                    console.log(err)
                }
            }
        };
        sendTrans();
    };





    return (
        <>
            <Container
                style={{
                    marginTop: "5rem",
                    padding: "2rem",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                }}
            >
                <Col xs="12">
                    <h4>Checkout</h4>
                    <Form onSubmit={(e) => {
                        newType === 'external' ? onSubmit(e, newType, user, vehicleInCart, cartItems, currentCartTotal(cartItems), applySale, discount, calcTaxes(currentCartTotal(cartItems)), (currentCartTotal(cartItems) + calcTaxes(currentCartTotal(cartItems))).toFixed(2)) : onSubmit(e, newType, user, vehicleInCart, cartItems, currentCartTotal(cartItems))
                    }} style={{ marginTop: "2rem" }}>
                        <FormGroup>
                            <section
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    marginBottom: "20px",
                                    padding: '2rem'
                                }}
                            >

                                <Label for="newType">Type of Transaction</Label><br />
                                <ButtonGroup size="sm">
                                    <Button onClick={() => setNewType('internal')} style={newType === 'internal' ? { backgroundColor: 'coral' } : {}}>Internal</Button>
                                    <Button onClick={() => setNewType('external')} style={newType === 'external' ? { backgroundColor: 'coral' } : {}}>External</Button>
                                </ButtonGroup>
                                <br />
                                <br />
                                {/* Dont required customer data for now */}

                                {newType === 'external' && (
                                    <>
                                        <Label for="name">Customer Full Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Full Name"
                                            className="mb-3"
                                            value={user.name}
                                            onChange={handleChange}
                                        />

                                        <Label for="email">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            className="mb-3"
                                            value={user.email}
                                            onChange={handleChange}
                                        />

                                        <Label for="phone">Phone Number</Label>
                                        <Input
                                            type="phone"
                                            name="phone"
                                            id="phone"
                                            placeholder="Phone Number"
                                            className="mb-3"
                                            value={user.phone}
                                            onChange={handleChange}
                                        />
                                        <Label for="amountReceived">Amount Received</Label>
                                        <Input
                                            type="number"
                                            name="amountReceived"
                                            id="amountReceived"
                                            placeholder="Amount Received from customer"
                                            className="mb-3"
                                            value={user.amountReceived}
                                            onChange={handleChange}
                                            required
                                        />
                                    </>)}
                                <Label for="message">Message</Label>
                                <Input
                                    type="textarea"
                                    name="message"
                                    id="message"
                                    placeholder="Do you need to leave a message?"
                                    className="mb-3"
                                    value={user.message}
                                    onChange={handleChange}
                                />
                                <Label for="operator">Operator</Label>
                                <Input
                                    type="operator"
                                    name="operator"
                                    id="operator"
                                    placeholder="Operator's name"
                                    className="mb-3"
                                    value={user.operator}
                                    onChange={handleChange}
                                    required
                                />
                                {newType === 'external' && (<Segment compact>
                                    <Checkbox toggle checked={applySale} onChange={() => setApplySale(!applySale)} label='Apply Discount' />
                                    {applySale && <>
                                        <span className='form-inline'>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="Discount" className="mr-sm-2">Discount &#37;</Label>
                                                <Input
                                                    type="percentage"
                                                    name="percentage"
                                                    id="percentage"
                                                    placeholder="Enter percentage"
                                                    value={user.percentage}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                            <Button onClick={() => applyDiscount(currentCartTotal(cartItems), user.percentage)}>Apply Discount</Button>
                                        </span>
                                    </>}


                                </Segment>)}
                            </section>

                            <ListGroupItem style={{ float: "right", marginBottom: "1rem" }}>
                                {newType === 'external' && (<>Subtotal: <strong> ${currentCartTotal(cartItems)}</strong>
                                    <br /></>)}
                                {newType === 'external' && discount > 0 && applySale && <><span>Discount: <strong><del>${discount.toFixed(2)}</del></strong></span><br /></>}

                                {newType === 'external' &&
                                    (<>
                                        Taxes(6.25 %): {" "}
                                        <strong>
                                            {" "}
                                            ${calcTaxes(currentCartTotal(cartItems))}
                                        </strong>{" "}
                                        <br />
                                        <hr /></>)}
                                Grand Total: <strong> ${newType === 'internal' ? currentCartTotal(cartItems) : applySale ? ((currentCartTotal(cartItems) - discount) + calcTaxes(currentCartTotal(cartItems))).toFixed(2) : (currentCartTotal(cartItems) + calcTaxes(currentCartTotal(cartItems))).toFixed(2)}</strong> <br />
                            </ListGroupItem>
                            <Button color="dark" style={{ marginTop: "0rem" }} block>
                                Confirm Transaction
              </Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Container>
        </>
    )
}
export default withRouter(CheckoutTransac)