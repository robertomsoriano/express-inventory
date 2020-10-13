import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

export const MyNavbar = (props) => {
  // const dispatch = useDispatch()
  const state = useSelector((state) => state);
  const user = state.auth.user;
  const auth = state.auth;
  const cart = state.cartItems;
  useEffect(() => {}, []);
  const [isOpen, setIsOpen] = useState(false);
  const cartTotal = () => {
    if (cart.cart.length) {
      let quant = cart.cart.map((item) => item.item_total);
      quant = quant.reduce((acc, curr) => acc + curr);
      let result = Math.round(quant * 100) / 100;
      return <i style={{ color: "coral" }}> Subtotal: ${result}</i>;
    }
    return;
  };
  const cartQuantity = () => {
    if (cart.cart.length) {
      let quant = cart.cart.map((item) => item.item_quantity);
      quant = quant.reduce((acc, curr) => acc + curr);
      return quant;
    }
    return;
  };
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => props.history.push("/dashboard")}>
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => props.history.push("/parts")}>Parts</NavLink>
      </NavItem>

      <UncontrolledDropdown nav inNavbar>
        {/* ----------------- */}
        <DropdownToggle nav caret>
          <i className="fa fa-shopping-cart">Cart {cartQuantity()}</i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem className="dropdown-item">
            <NavLink onClick={() => props.history.push("/cart")}>
              <i className="fa fa-shopping-cart">
                Cart{cart.cart.length > 0 && `(${cartQuantity()}):`}{" "}
                {cartTotal()}
              </i>
            </NavLink>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <NavLink onClick={() => props.history.push("/checkout")}>
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
      <NavItem style={{ marginLeft: ".5rem" }}>
        <LoginModal />
      </NavItem>
    </Fragment>
  );
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Express Inventory</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* {guestLinks} */}
              {auth.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default withRouter(MyNavbar);
