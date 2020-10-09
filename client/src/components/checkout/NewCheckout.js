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

const NewCheckout = props => {
  // server msg
  const books = useSelector(state => state.cart.cart);
  // const [invoice, setInvoice] = useState(null);
  const invoice = props.invoice?props.invoice.invoice_number: null;
  const [applySale, setApplySale] = useState(false)
//   const [percentage, setPercentage] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [user, handleChange] = useForm({
    name: "Anonimo",
    email: "anonimo@gmail.com",
    phone: "999-999-9999",
    received: null,
    message: '',
    assistant: "Robert",
    percentage: 0
  });
  useEffect(() => {
    props.clearInvoice();
    props.setCart();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    console.log(user.percentage)
  }, []);

  //Helper for applying discount
  const applyDiscount = (percent=user.percentage) => {
    
    let subtotal = (total() * (percent/100))
    console.log(subtotal)
    setDiscount(subtotal)
    return 
  }
// Helper function to set items total
const total = () => {
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
  const calcTaxes = (percentage=0.0625) => {
      if(applySale){
        return Math.round((total()- discount) * percentage * 100) / 100
      }else{
        return Math.round(total() * percentage * 100) / 100
      }
    
  }
  const grandTotal = () => {
      if(applySale){
          return (((total()-discount) + calcTaxes()).toFixed(2))
      }
    else{
        return ((total() + calcTaxes()).toFixed(2))
    }
  };
  const seller = "Iglesia Bautista Bíblica Inc.";

  // Post Transaction
  const onSubmit = e => {
    e.preventDefault();
    // Set Transaction object
    const sendTrans = async () => {
      if (!user.assistant) {
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
            // Don't required customer data for now
            customer: {
              name: user.name,
              email: user.email,
              phone: user.phone
            },
            items: books.map(book => ({
              name: book.name,
              quantity: book.quantity,
              _id: book._id,
              price:book.price
            })),
            sale: applySale,
            subtotal: total(),
            discount: discount,
            taxes: calcTaxes(),
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
              {/* Dont required customer data for now */}
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
                          <td>{book.quantity}</td><td>${book.price}</td>
                          <td>${(book.price * book.quantity).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </ListGroupItem>
              <ListGroupItem style={{ float: "right", marginBottom: "1rem" }}>
                Subtotal: <strong> ${total()}</strong>
                <br />
                {discount> 0 && applySale &&<><span>Discount: <strong><del>${discount.toFixed(2)}</del></strong></span><br/></>}
                
                Taxes (6.25%):{" "}
                <strong>
                  {" "}
                  ${calcTaxes()}
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
        sale={props.sale}
        discount={props.discount}
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
)(withRouter(NewCheckout));

