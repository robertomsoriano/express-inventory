import React, { useEffect, useState } from "react";
import moment from 'moment'
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux"
import { Container, ListGroup, Card, Spinner, Row, Col, Button } from "react-bootstrap";
import { setInvoice } from "../../actions/checkoutActions";
import { Grid, DropdownMenu } from "semantic-ui-react";
import Invoice from "../invoice/Invoice";
import TransModal from "./TransModal";
const Trans = (props) => {
  const [showInvoice, setShowInvoice] = useState(false)
  const [transac, setTransac] = useState({})
  const trans = useSelector(state => state.trans)
  return (
    <>
      {!trans.trans.length === 0 && (
        <div className="spinner">
          <Spinner animation="grow" variant="info" />
        </div>
      )}
      {trans.trans.length < 1 && (
        <div>
          <div style={{ magin: '5rem' }}>you have no trasanctions.</div>
        </div>
      )}
      {trans.trans.length && (

        <Container className='trans-container'>
          <Row>
            {trans.trans.map((trans, idx) => (
              <TransModal title={moment(trans.transac_date).format("LLL")} customer={trans.transac_status} header={moment(trans.transac_date).format("LLL")} key={idx}>
                <Col sm key={idx}>
                  <Card key={trans.invoice_number} className='trans-card' style={cardStyle}>
                    <ListGroup>
                      <ListGroup.Item action><strong>Invoice number: </strong> {trans.invoice_number}</ListGroup.Item>
                      <ListGroup.Item><strong>Sale date:</strong> {moment(trans.transac_date).format("LLL")}</ListGroup.Item>
                      <ListGroup.Item><strong>Transaction total:</strong> ${trans.transac_total}</ListGroup.Item>
                      <ListGroup.Item><strong>Assistant:</strong> {trans.transac_operator}</ListGroup.Item>
                      <ListGroup.Item ><Grid columns={1} relaxed='very' stackable>
                        {trans.transac_type === "external" && (<Grid.Column>
                          <DropdownMenu
                            size="sm"
                            variant="secondary"
                            title="Customer"
                            key={idx}
                          >
                            <h5>Customer</h5>
                            {trans.transac_customer.name && <p key={trans.transac_customer.name} >Name: {trans.transac_customer.name}</p>}
                            {trans.transac_customer.email && <p key={trans.transac_customer.email} >Email: {trans.transac_customer.email}</p>}
                            {trans.transac_customer.phone && <p key={trans.transac_customer.phone} >Phone: {trans.transac_customer.phone}</p>}
                          </DropdownMenu>
                        </Grid.Column>)}
                        <Grid.Column>
                          <DropdownMenu
                            size="sm"
                            variant="secondary"
                            title="Items"
                            key={idx}
                          >
                            <h5>Items</h5>
                            <Card.Body>
                              {trans.transac_items.map((item) => (
                                <p as={'li'} key={item._id} >({item.item_quantity}) {item.item_name}</p>
                              ))}
                            </Card.Body>
                            {trans.amount_received && (
                              <>
                                <h5>Amount Received</h5>
                                <p as={'li'} key={trans.amount_received} >${trans.amount_received}</p>
                              </>
                            )}
                            {trans.message && (
                              <>
                                <h5>Message</h5>
                                <p as={'li'} key={trans.transac_message} >{trans.transac_message}</p>
                              </>
                            )}
                          </DropdownMenu>
                        </Grid.Column>
                      </Grid></ListGroup.Item>
                    </ListGroup>
                    <Button variant="light" onClick={() => {
                      setTransac(trans);
                      setShowInvoice(!showInvoice);
                      props.setInvoice(trans);
                      props.history.push({
                        pathname: '/invoice',
                        state: { trans }
                      })
                    }}>Print invoice</Button>
                  </Card>

                </Col>
              </TransModal>
            ))}
          </Row>

        </Container>)}
      {showInvoice && (
        <div>
          <Invoice
            id={trans._id}
            invoice_number={trans.invoice_number}
            transac_type={trans.transac_type}
            transac_items={trans.transac_items}
            transac_status={trans.transac_status}
            transac_operator={trans.transac_operator}
            transac_vehicle={trans.transac_vehicle}
            sale_transac={trans.sale_transac}
            transac_subtotal={trans.transac_subtotal}
            transac_discount={trans.transac_discount}
            transac_taxes={trans.transac_taxes}
            transac_total={trans.transac_total}
            amount_received={trans.amount_received}
            transac_message={trans.transac_message}
            transac_date={trans.transac_date}
          />
        </div>)}
    </>
  );
};

export default withRouter(Trans);

const cardStyle = {
  display: 'flex',
  margin: '.3rem',
  width: "30rem",
  minWidth: '300px',
  maxWidth: '350px',
  boxRadius: '0.5rem',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0, 0.075), 0 0 8px hsla(0, 0%, 76.9%, 0.4)'
}