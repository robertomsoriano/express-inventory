import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { setCart } from '../actions/cartActions'

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    console.log(this.props.cart)
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  cartTotal() {
    if (this.props.cart.cart.length) {

      let quant = this.props.cart.cart.map(book => book.item_total);
      quant = quant.reduce((acc, curr) => acc + curr);
      let result = Math.round(quant * 100) / 100;
      return <i style={{ color: 'coral' }}> Subtotal: ${result}</i>
    }
    return
  }
  cartQuantity() {
    if (this.props.cart.cart.length) {
      let quant = this.props.cart.cart.map(book => book.quantity);
      quant = quant.reduce((acc, curr) => acc + curr);
      return quant
    }
    return
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => this.props.history.push("/dashboard")}>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => this.props.history.push("/parts")}>
            Parts
          </NavLink>
        </NavItem>

        <UncontrolledDropdown nav inNavbar>
          {/* ----------------- */}
          <DropdownToggle nav caret>
            <i className="fa fa-shopping-cart">Cart {this.cartQuantity()}</i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem className='dropdown-item'>
              <NavLink onClick={() => this.props.history.push("/cart")}>
                <i className="fa fa-shopping-cart">Cart{this.props.cart.cart.length > 0 && `(${this.cartQuantity()}):`} {this.cartTotal()}</i>
              </NavLink>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <NavLink onClick={() => this.props.history.push("/checkout")}>
                Proceed to Checkout
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem style={{ marginLeft: '.5rem' }}>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Express Inventory</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cartItems
});

export default connect(
  mapStateToProps,
  { setCart }
)(withRouter(AppNavbar));
