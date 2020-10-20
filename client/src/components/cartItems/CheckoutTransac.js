import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
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

        let subtotal = (total * (percent / 100))
        console.log(subtotal)
        setDiscount(subtotal)
        return
    }
    // Calculate Taxes
    const calcTaxes = (total, percentage = 0.0625) => {
        if (applySale) {
            return Math.round((total - discount) * percentage * 100) / 100
        } else {
            return Math.round(total * percentage * 100) / 100
        }

    }
    // Calculate Grand Total
    const grandTotal = (total, discount) => {
        if (applySale) {
            return (((total - discount) + calcTaxes()).toFixed(2))
        }
        else {
            return ((total + calcTaxes()).toFixed(2))
        }
    };
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
    }, []);

    // Post Transaction
    const onSubmit = e => {
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
                    await dispatch(postTransaction({
                        transac_type: newType,
                        transac_operator: user.operator,
                        transac_customer: { name: user.name, phone: user.phone, email: user.email },
                        transac_vehicle: vehicleInCart,
                        transac_items: cartItems,
                        sale_transac: applySale,
                        transac_subtotal: 0,
                        // transac_discount: applyDiscount(0, 0),
                        // transac_taxes: calcTaxes(0, 0),
                        // transac_total: grandTotal(0, 0),
                        amount_received: user.amountReceived,
                        transac_message: user.message,
                    }))
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
                    <Form onSubmit={onSubmit} style={{ marginTop: "2rem" }}>
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
                                        <Label for="received">Amount Received</Label>
                                        <Input
                                            type="number"
                                            name="received"
                                            id="received"
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
                                    <Checkbox toggle checked={applySale} onChange={() => setApplySale(!applySale)} label='Apply Sale Price' />
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
                                            <Button onClick={() => applyDiscount()}>Apply Discount</Button>
                                        </span>
                                    </>}


                                </Segment>)}
                            </section>

                            <ListGroupItem style={{ float: "right", marginBottom: "1rem" }}>
                                Subtotal: <strong> ${9999999}</strong>
                                <br />
                                {discount > 0 && applySale && <><span>Discount: <strong><del>${discount.toFixed(2)}</del></strong></span><br /></>}

                                Taxes (6.25%):{" "}
                                <strong>
                                    {" "}
                                    ${calcTaxes()}
                                </strong>{" "}
                                <br />
                                <hr />
                                Grand Total: <strong> ${grandTotal()}</strong> <br />
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