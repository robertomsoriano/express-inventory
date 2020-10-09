import React, {useEffect, useState} from "react";
import moment from 'moment'
import { withRouter} from "react-router-dom";
import { connect, useSelector } from "react-redux"
import { Container, ListGroup, Card, Spinner, Row, Col, Button} from "react-bootstrap";
import { getTrans } from "../../actions/transActions";
import { setInvoice } from "../../actions/checkoutActions";
import { Grid, DropdownMenu} from "semantic-ui-react";
import Invoice from "../checkout/Invoice";
import TransModal from "./TransModal";
const Trans = (props) => {
  const [showInvoice, setShowInvoice] = useState(false)
  const [transac, setTransac] = useState({})
const trans = useSelector(state =>state.trans)
  useEffect(() => {
    props.getTrans();
    // eslint-disable-next-line
  }, [trans.length]);
  return (
    <>
    {!trans.trans.length === 0 && (
      <div className="spinner">
          <Spinner animation="grow" variant="info" />
        </div>
        )}
        {trans.trans.length < 1 && (
      <div>
          <div style={{magin: '5rem'}}>you have no trasanctions.</div>
        </div>
        )}
      {trans.trans.length && (
        
      <Container className='trans-container'>
      <Row>
        {trans.trans.map((trans, idx) => (
          <TransModal title={moment(trans.sale_date).format("LLL")} customer={trans.customer.name} header={moment(trans.sale_date).format("LLL")} key={idx}>
          <Col sm key={idx}>
          <Card key={trans.invoice_number} className='trans-card' style={cardStyle}>
          <ListGroup>
            <ListGroup.Item action><strong>Invoice number: </strong> {trans.invoice_number}</ListGroup.Item>
            <ListGroup.Item><strong>Sale date:</strong> {moment(trans.sale_date).format("LLL")}</ListGroup.Item>
            <ListGroup.Item><strong>Transaction total:</strong> ${trans.total}</ListGroup.Item>
            <ListGroup.Item><strong>Assistant:</strong> {trans.assistant}</ListGroup.Item>
            <ListGroup.Item ><Grid columns={1} relaxed='very' stackable>
            <Grid.Column>
                <DropdownMenu
                  size="sm"
                  variant="secondary"
                  title="Customer"
                  key={idx}
                >
                <h5>Customer</h5>
                 {trans.customer.name &&<p key={trans.customer.name} >Name: {trans.customer.name}</p>}
                  {trans.customer.email &&<p key={trans.customer.email} >Email: {trans.customer.email}</p>}
                  {trans.customer.phone &&<p key={trans.customer.phone} >Phone: {trans.customer.phone}</p>}
                </DropdownMenu>
                </Grid.Column>
                <Grid.Column>
                <DropdownMenu
                  size="sm"
                  variant="secondary"
                  title="Items"
                  key={idx}
                >
                <h5>Items</h5>
                 <Card.Body>
                    {trans.items.map((item) => (
                      <p as={'li'} key={item.id} >({item.quantity}) {item.name}</p>
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
                  <p as={'li'} key={trans.message} >{trans.message}</p>
                  </>
                  )}
                </DropdownMenu>
                </Grid.Column>
            </Grid></ListGroup.Item>
          </ListGroup>
          <Button variant="light" onClick={()=> {
            setTransac(trans);
            setShowInvoice(!showInvoice);
            props.setInvoice(trans);
            props.history.push({
              pathname: '/invoice',
              state: {trans}
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
    invoiceNumber={transac.invoice_number}
    user={transac.customer}
    books={transac.items}
    subtotal={transac.subtotal}
    taxes={transac.taxes}
    total={transac.total}
    amount_received={transac.amount_received}
    sale={transac.sale}
    discount={transac.discount}
    /> 
  </div>)}  
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
  { getTrans, setInvoice }
)(withRouter(Trans));


const cardStyle = {
  display:'flex',
  margin: '.3rem',
  width: "30rem",
  minWidth:'300px',
  maxWidth: '350px',
  boxRadius: '0.5rem',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0, 0.075), 0 0 8px hsla(0, 0%, 76.9%, 0.4)'
}


