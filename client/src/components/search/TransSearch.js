import _ from "lodash";
import moment from 'moment'
import React, { Component } from "react";
import { connect} from "react-redux";
import {setInvoice} from '../../actions/checkoutActions'
import {  withRouter} from "react-router-dom";
import { Search, Grid, DropdownMenu, Icon } from "semantic-ui-react";
import { Container, ListGroup, Card, Row, Col, Button} from "react-bootstrap";
import Trans from "../dashboard/Trans";
import Invoice from '../checkout/Invoice'

const initialState = { isLoading: false, results: [], value: "", toggle: false};

class TransSearch extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.customer.name, results: [result] });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(`${result.customer.name} ${result.assistant} ${moment(result.sale_date).format("LLL")}`);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.trans, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results, toggle } = this.state;
    const trans = results

    return (
      <Grid>
        <Grid.Column width={10}>
          <Search
            input={{icon: value.length<=0?<Icon name='search'/>: <Icon className='search-icon' name='delete' link onClick={()=> this.setState({ isLoading: false, results: [], value: "" })}/>, iconPosition: 'left'}}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            resultRenderer={resultRenderer}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        {/* <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(this.props.trans, null, 2)}
            </pre>
          </Segment>
        </Grid.Column> */}
        {trans.length && (
      <Container className='trans-container'>
      <Row>
        {trans.map((trans, idx) => (
          <Col sm key={idx}>
          <Card key={trans.invoice_number} className='trans-card' style={cardStyle}>
          <ListGroup>
            <ListGroup.Item action><strong>Invoice number: </strong> {trans.invoice_number}</ListGroup.Item>
            <ListGroup.Item><strong>Sale date:</strong> {moment(trans.sale_date).format("LL")}</ListGroup.Item>
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
                </DropdownMenu>
                </Grid.Column>
            </Grid></ListGroup.Item>
          </ListGroup>
          <Button variant="light" onClick={()=> {
            this.setState({toggle: !toggle}); 
            this.props.setInvoice(trans);
            this.props.history.push({
              pathname: '/invoice',
              state: {trans}
            })}}>Print invoice</Button>
        </Card>
        {trans && toggle && showInvoice(trans)}
        </Col>
        ))}
        </Row>
                    
      </Container>)}
      {!results.length && <Trans/>}
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
    trans: state.trans.trans
  });
  
  export default connect(
    mapStateToProps,
    {setInvoice}
  )(withRouter(TransSearch));


const resultRenderer =({items, customer, total, sale_date, assistant }) => [
  <div key='content' className='content'>
    {customer && <div className='price'>Customer: {customer.name}</div>}
    {total && <div className='title'>Total: ${total}</div>}
    {sale_date && <div className='description'>Sale date: {moment(sale_date).format("LL")}</div>}
    {items && items.map(item => (
        <p>({item.quantity}) {item.name}</p>
    ))}
    {assistant && <div className='title'>Assistant: {assistant}</div>}
  </div>
]


const cardStyle = {
    display:'flex',
    margin: '.3rem',
    width: "30rem",
    minWidth:'300px',
    maxWidth: '350px',
    boxRadius: '0.5rem',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0, 0.075), 0 0 8px hsla(0, 0%, 76.9%, 0.4)'
  }

 const showInvoice=(transac)=> (
    <div>
      <Invoice
      invoiceNumber={transac.invoice_number}
      user={transac.customer}
      books={transac.items}
      subtotal={transac.subtotal}
      taxes={transac.taxes}
      total={transac.total}
      /> 
    </div>)