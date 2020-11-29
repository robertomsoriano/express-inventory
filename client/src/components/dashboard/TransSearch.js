import _ from "lodash";
import moment from 'moment'
import React, { Component } from "react";
import { connect } from "react-redux";
import { getTrans } from '../../actions/transActions'
import { withRouter } from "react-router-dom";
import { Search, Grid, DropdownMenu, Icon } from "semantic-ui-react";
import { Container, ListGroup, Card, Row, Col, Button } from "react-bootstrap";
import Invoice from '../invoice/Invoice'
import Trans from '../dashboard/Trans'

const initialState = { isLoading: false, results: [], value: "", toggle: false };

class TransSearch extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.transac_type, results: [result] });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(`${result.transac_status} ${result.transac_type} ${result.transac_customer ? result.transac_customer.name : ''}  ${result.transac_items.map(x => x.item_name)} ${result.transac_operator} ${moment(result.transac_date).format("LLL")}`);

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
            input={{ type: value.length <= 0 ? <Icon name='search' /> : <Icon className='search-icon' name='delete' link onClick={() => this.setState({ isLoading: false, results: [], value: "" })} />, iconPosition: 'left' }}
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
        {trans.length && (
          <Container className='trans-container'>
            <Row>
              {trans.map((trans, idx) => (
                <Col sm key={idx}>
                  <Card key={trans.invoice_number} className='trans-card' style={cardStyle}>
                    <ListGroup>
                      <ListGroup.Item action><strong>Status: </strong> {trans.transac_status}</ListGroup.Item>
                      <ListGroup.Item action><strong>Invoice number: </strong> {trans.invoice_number}</ListGroup.Item>
                      <ListGroup.Item><strong>Sale date:</strong> {moment(trans.transac_date).format("LL")}</ListGroup.Item>
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
                          </DropdownMenu>
                        </Grid.Column>
                      </Grid></ListGroup.Item>
                    </ListGroup>
                    <Button variant="light" onClick={() => {
                      this.setState({ toggle: !toggle });
                      this.props.history.push({
                        pathname: '/invoice',
                        state: { trans }
                      })
                    }}>Print invoice</Button>
                  </Card>
                  {trans && toggle && showInvoice(trans)}
                </Col>
              ))}
            </Row>

          </Container>)}
        {!results.length && <Trans />}
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  trans: state.trans.trans
});

export default connect(
  mapStateToProps
)(withRouter(TransSearch));


const resultRenderer = ({ transac_items, transac_date, transac_operator, transac_total, transac_status }) => [
  <div key='content' className='content'>
    {transac_status && <div className='price'>Customer: {transac_status}</div>}
    {transac_total && <div className='title'>Total: ${transac_total}</div>}
    {transac_date && <div className='description'>Sale date: {moment(transac_date).format("LL")}</div>}
    {transac_items && transac_items.map(item => (
      <p>({item.item_quantity}) {item.item_name}</p>
    ))}
    {transac_operator && <div className='title'>Assistant: {transac_operator}</div>}
  </div>
]


const cardStyle = {
  display: 'flex',
  margin: '.3rem',
  width: "20rem",
  minWidth: '300px',
  maxWidth: '350px',
  boxRadius: '0.5rem',
  boxShadow: 'inset 0 1px 1px rgba(0,0,0, 0.075), 0 0 8px hsla(0, 0%, 76.9%, 0.4)'
}

const showInvoice = (transac) => {
  let { _id,
    invoice_number,
    transac_type,
    transac_items,
    transac_status,
    transac_operator,
    transac_vehicle,
    sale_transac,
    transac_subtotal,
    transac_discount,
    transac_taxes,
    transac_total,
    amount_received,
    transac_message,
    transac_date } = transac
  return (

    <div>
      <Invoice
        id={_id}
        invoice_number={invoice_number}
        transac_type={transac_type}
        transac_items={transac_items}
        transac_status={transac_status}
        transac_operator={transac_operator}
        transac_vehicle={transac_vehicle}
        sale_transac={sale_transac}
        transac_subtotal={transac_subtotal}
        transac_discount={transac_discount}
        transac_taxes={transac_taxes}
        transac_total={transac_total}
        amount_received={amount_received}
        transac_message={transac_message}
        transac_date={transac_date}
      />
    </div>)
}