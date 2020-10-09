import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import useForm from "../../hooks/useForm";
// import { cartTotal } from "../../actions/cartActions";
import Invoice from "./Invoice";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ListGroupItem,
  Table
  //   NavLink,
  //   Alert
} from "reactstrap";
import { Checkbox, Segment } from 'semantic-ui-react'
import { setCart } from "../../actions/cartActions";
import { postTransaction, setInvoice, clearInvoice } from "../../actions/checkoutActions"
import Swal from "sweetalert2";

const CheckOut = props => {
  // server msg
  const books = useSelector(state => state.cart.cart);
  // const [invoice, setInvoice] = useState(null);
  const invoice = props.invoice?props.invoice.invoice_number: null;
  const [applySale, setApplySale] = useState(false)
  const [user, handleChange] = useForm({
    name: "",
    email: "",
    phone: "",
    received: null,
    message: '',
    assistant: ""
  });
  useEffect(() => {
    props.clearInvoice();
    props.setCart();
    // eslint-disable-next-line
  }, []);
  // Set cart total
  const total = () => {
    if (!books) {
      return 1;
    } else if (books.length > 0) {
      // let totalVariable = applySale?(book.item_total*.90).toFixed(2) : book.item_total
      let totalAmount = books.map(book => (book.sale_price*.90));
      // let totalAmount = books.map(book => book.item_total);
      totalAmount = totalAmount.reduce((acc, curr) => acc + curr);
      let result = Math.round(totalAmount * 100) / 100;
      console.log(result)
      return result;
    } else {
      return 1;
    }
  };
  const grandTotal = () => {
    return (total() + Math.round(total() * 0.0625 * 100) / 100).toFixed(2);
  };
  const seller = "Iglesia Bautista Bíblica Inc.";

  // Post Transaction
  const onSubmit = e => {
    e.preventDefault();
    // Set Transaction object
    const sendTrans = async () => {
      if (!user.assistant || !user.name) {
        Swal.fire(
          "No customer information",
          "Please enter all the customer's info.",
          'error'
        )
        return;
      } else {

        try {
          
          await props.postTransaction({
          transaction: {
            seller: seller,
            assistant: user.assistant,
            customer: {
              name: user.name,
              email: user.email,
              phone: user.phone
            },
            items: books.map(book => ({
              name: book.name,
              quantity: book.quantity,
              _id: book._id,
              // price: book.price,
              price:(applySale&& book.sale_price!== undefined)?(book.sale_price*.90).toFixed(2): book.price
            })),
            subtotal: total(),
            taxes: (Math.round(total() * 0.0625 * 100) / 100),
            total: grandTotal(),
            amount_received: user.received,
            message: user.message,
            booksToUpdate: books.map(book => ({
              id: book._id,
              quantity: book.quantity
            }))
          }
        })
        // await props.history.push({
        //   pathname: '/dashboard'
        // })
      }catch(err){
          console.log(err)
        }
      }
    };
    sendTrans();
  };

  return !books ? (
    <>
      <div>No Books Available</div>
    </>
  ) : !invoice ? (
    <>
      <Container
        style={{
          marginTop: "2rem",
          padding: "4rem",
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
                  marginBottom: "20px"
                }}
              >
                <Label for="name">Customer Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="mb-3"
                  value={user.name}
                  onChange={handleChange}
                  required
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
                  value={user.received}
                  onChange={handleChange}
                  required
                />
                <Label for="message">Message</Label>
                <Input
                  type="textarea"
                  name="message"
                  id="message"
                  placeholder="Do you need to leave a message?"
                  className="mb-3"
                  value={user.message}
                  onChange={handleChange}
                  required
                />
                <Label for="assistant">Assistant</Label>
                <Input
                  type="assistant"
                  name="assistant"
                  id="assistant"
                  placeholder="Assistant's name"
                  className="mb-3"
                  value={user.assistant}
                  onChange={handleChange}
                  required
                />
                <Segment compact>
                  <Checkbox toggle checked={applySale} onChange={() =>setApplySale(!applySale)} label='Apply Sale Price'/>
                 </Segment>
              </section>
              <ListGroupItem>
                <h4>Order items</h4>
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
                          <td>{book.quantity}</td>
                          <td>${(applySale&& book.sale_price!== undefined)?(book.sale_price*.90).toFixed(2): book.price}</td>
                          <td>${(((applySale&& book.sale_price!== undefined)?(book.sale_price*.90).toFixed(2): book.price)* book.quantity).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </ListGroupItem>
              <ListGroupItem style={{ float: "right", marginBottom: "1rem" }}>
                Subtotal: <strong> ${total()}</strong>
                <br />
                Taxes (6.25%):{" "}
                <strong>
                  {" "}
                  ${Math.round(total() * 0.0625 * 100) / 100}
                </strong>{" "}
                <br />
                <hr />
                Grand Total: <strong> ${grandTotal()}</strong> <br />
              </ListGroupItem>
              <ListGroupItem style={{ float: "left", marginBottom: "1rem" }}>
                <Link to={"/cart"}>
                  <Button>Edit Cart</Button>
                </Link>
              </ListGroupItem>
              <Button color="dark" style={{ marginTop: "0rem" }} block>
                Confirm Order
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Container>
    </>
  ) : (
    <div>
      {props.history.push('/invoice')}
      <Invoice
        invoiceNumber={props.invoice.invoice_number}
        user={props.invoice.customer}
        books={props.invoice.items}
        subtotal={props.invoice.subtotal}
        taxes={props.invoice.taxes}
        total={props.invoice.total}
        amount_received={props.invoice.amount_received}
      />
    </div>
  )
};

const mapStateToProps = state => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
  invoice: state.checkout.invoice
});
export default connect(
  mapStateToProps,
  { setCart, postTransaction, setInvoice, clearInvoice }
)(withRouter(CheckOut));
